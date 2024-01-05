import { useEffect, useRef, useState } from 'react';
import './Btns.scss';
import Anime from '../../../asset/anime';
import useThrottle from '../../../hooks/useThrottle';

// scrollTop: 화면보다 큰 요소가 있을 때 그 요소에서 수직으로 스크롤된 거리를 나타내는 요소 속성이다. 만약, viewport 의 height 가 500px 이고 요소의 height 가 800px 인 경우 300 => 즉, scrollTop 은 요소를 얼마나 scroll 했는지를 말하고 대부분은 app 에다가 적용해 전체화면으로 다룬다.
// DOM.scrollY : browser(DOM 요소)를 스크롤할때마다 스크롤되고 있는 맨 위에서부터의 거리값
// DOM.offsetTop: 문서에서 해당 돔 요소의 세로 위치값

// 컴포넌트를 재활용하고 싶을때는 props 를 잘 활용하자!
export default function Btns({ frame, items, base, isAuto }) {
	const defOpt = useRef({
		frame: '.App',
		items: '.myScroll',
		base: -window.innerHeight / 2,
		isAuto: false
	});
	const [Num, setNum] = useState(0);
	const secs = useRef(null);
	const app = useRef(null);
	const btns = useRef(null);
	const baseline = useRef(window.innerHeight / 3);
	const isMotion = useRef(false);

	const activation = () => {
		const scroll = app.current.scrollTop;

		secs.current.forEach((sec, idx) => {
			if (scroll >= secs.current[idx].offsetTop - baseline.current) {
				Array.from(btns.current.children).forEach(btn =>
					btn.classList.remove('on')
				);
				btns.current.children[idx].classList.add('on');
				return;
			}
		});

		/* 
			for-if return 문으로 배열탐색할 때 가장 먼저 조건맞는 것을 액티브함
		*/

		/*  
		사건은? 스크롤마다 발생
		
		스크롤 마다 현재 scroll 이 얼마나 진행됐는지 체크한 후 section 의 offsetTop[0 ~ section 개수] 보다 클 경우 activattion 진행한다. 
	*/
		/* 
		부모 컴포넌트가 사라지면 
	*/
	};

	const moveScroll = idx => {
		// 모션중이면 이동안함
		if (isMotion.current) return;
		isMotion.current = true;
		new Anime(
			app.current,
			{
				scroll:
					idx === 0
						? secs.current[idx].offsetTop - 60
						: secs.current[idx].offsetTop
			},
			{ callback: () => (isMotion.current = false) }
		);
	};

	const autoScroll = e => {
		/* 
			사건은? 
		*/
		const btnsArr = Array.from(btns.current.children);
		const activeEl = btns.current.querySelector('li.on');
		const activeIndex = btnsArr.indexOf(activeEl);

		console.log('autoscroll');

		if (e.deltaY > 0) {
			// 0 이상이면 수직으로 내리면 active 된 것이 Num 이 아니면
			// Num - 1 은 section index 를 의미
			// 스크롤 내릴 때 activeIndex 와 section 인덱스가 다르면 activeIndex 를 변경한다.
			activeIndex !== Num - 1 && moveScroll(activeIndex + 1);
		} else {
			activeIndex !== 0 && moveScroll(activeIndex - 1);
		}
	};

	const modifyPos = () => {
		const btnsArr = Array.from(btns.current.children);
		const activeEl = btns.current.querySeletor('li.on');
		const activeIndex = btnsArr.indexOf(activeEl);
		app.current.scrollTop = secs.current[activeIndex].offsetTop;
	};

	const throttledActivation = useThrottle(activation);

	useEffect(() => {
		app.current = document.querySelector('.App');
		secs.current = document.querySelectorAll('.myScroll');
		setNum(secs.current.length);

		app.current.addEventListener('resize', modifyPos);
		app.current.addEventListener('scroll', throttledActivation);
		app.current.addEventListener('wheel', autoScroll);

		return () => {
			app.current.removeEventListener('resize', modifyPos);
			app.current.removeEventListener('scroll', throttledActivation);
			app.current.removeEventListener('wheel', autoScroll);
		};
	});

	return (
		<ul className='Btns' ref={btns}>
			{Array(Num)
				.fill()
				.map((_, idx) => {
					return <li key={idx} className={idx === 0 ? 'on' : ''}></li>;
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

/* 

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

	const moveScroll = idx => {
		new Anime(
			app.current,
			{ scroll: secs.current[idx].offsetTop },
			{ duration: 500 }
		);
	};

	// currentTarget 과 target 의 차이가 있다.
	const autoScroll = e => {
		const btnsArr = Array.from(btns.current.children);
		const activeEl = btns.current.querySelector('li.on');
		const activeIndex = btnsArr.indexOf(activeEl);
		console.log(btnsArr);

		if (e.deltaY > 0) {
			activeIndex !== Num - 1 && moveScroll(activeIndex + 1);
		} else {
			activeIndex !== 0 && moveScroll(activeIndex - 1);
		}
	};

	const throttledActivation = useThrottle(activation, 300);
	const throttledScroll = useThrottle(autoScroll, 100);

	// 현재 num 이 원하는대로 초기화 안돼 num 에 상수값을 준 상황임
	useEffect(() => {
		app.current = document.querySelector('.App');
		secs.current = document.querySelectorAll('.myScroll');
		setNum(secs.current.length);

		app.current.addEventListener('scroll', throttledActivation);
		app.current.addEventListener('mousewheel', autoScroll);
		return () => {
			app.current.removeEventListenr('scroll', throttledActivation);
			app.current.removeEventListener('mousewheel', autoScroll);
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
							className={idx === 0 ? 'on' : ''}
							onClick={() => {
								moveScroll(idx);
							}}></li>
					);
				})}
		</ul>
	);


*/
