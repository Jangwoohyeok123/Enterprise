import { useEffect, useRef, useState } from 'react';
import './Btns.scss';
import Anime from '../../../asset/anime';
import useThrottle from '../../../hooks/useThrottle';

// DOM.scrollY : browser(DOM 요소)를 스크롤할때마다 스크롤되고 있는 맨 위에서부터의 거리값
// DOM.offsetTop: 문서에서 해당 돔 요소의 세로 위치값

export default function Btns() {
	const [Index, setIndex] = useState(0);
	const [Num, setNum] = useState(0);
	const app = useRef(null);
	const secs = useRef(null);
	const btns = useRef(null);
	const baseline = useRef(-window.innerHeight / 2);

	const activation = () => {
		console.log('throttling 적용');
		// button 활성화 로직
		const scroll = app.current.scrollTop;

		secs.current.forEach((sec, idx) => {
			if (scroll >= secs.current[idx].offsetTop + baseline.current) {
				Array.from(btns.current.children).forEach(btn =>
					btn.classList.remove('on')
				);
				btns.current.children[idx].classList.add('on');
			}
		});
	};

	// 인자로 핸들러함수를 넘겨주면 useThrottle 함수는 throttling 이 적용된 핸들러함수를 제공한다.
	const throttledActivation = useThrottle(activation, 100);

	// 현재 num 이 원하는대로 초기화 안돼 num 에 상수값을 준 상황임
	useEffect(() => {
		app.current = document.querySelector('.App');
		secs.current = document.querySelectorAll('.myScroll');
		setNum(secs.current.length);

		app.current.addEventListener('scroll', throttledActivation);
		return () => {
			app.current.removeEventListenr('scroll', throttledActivation);
		};
	}, []);

	return (
		<ul className='Btns' ref={btns}>
			{Array(Num)
				.fill()
				.map((_, idx) => {
					return (
						<li
							key={idx}
							className={idx === Index ? 'on' : ''}
							onClick={() => {
								new Anime(
									app.current,
									{
										scroll: secs.current[idx].offsetTop + 1
									},
									{
										ease: [0.32, 0.7, 0.76, 0.6]
									}
								);
								console.log(secs.current[idx].offsetTop);
							}}></li>
					);
				})}
		</ul>
	);
}

/* 
	offsetTop: section 의 위치 
	scrollTop: 현재 스크롤의 위치
*/

/* 
	parameter: 선택자, 속성들, animation custom option 값들
  new Anime(선택자, {속성명1: 속성값2, 속성명2: 속성값2}, {duration: 속도, easeType: 가속도})

*/
