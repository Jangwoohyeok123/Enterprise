import { useEffect, useRef, useState } from 'react';
import './Btns.scss';
import Anime from '../../src/asset/anime';
import { useThrottle } from '../../src/hooks/useThrottle';

// scrollTop: 화면보다 큰 요소가 있을 때 그 요소에서 수직으로 스크롤된 거리를 나타내는 요소 속성이다. 만약, viewport 의 height 가 500px 이고 요소의 height 가 800px 인 경우 300 => 즉, scrollTop 은 요소를 얼마나 scroll 했는지를 말하고 대부분은 app 에다가 적용해 전체화면으로 다룬다.
// DOM.scrollY : browser(DOM 요소)를 스크롤할때마다 스크롤되고 있는 맨 위에서부터의 거리값
// DOM.offsetTop: 문서에서 해당 돔 요소의 세로 위치값

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
				const btnsArr = btns.current?.querySelectorAll('li');
				btnsArr?.forEach(btn => btn.classList.remove('on'));
				btns.current?.querySelectorAll('li')[idx]?.classList.add('on');
				return;
			}
		});
	};

	// 모션중이면 이동안함
	const moveScroll = idx => {
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
		const btnsArr = Array.from(btns.current.children);
		const activeEl = btns.current.querySelector('li.on');
		const activeIndex = btnsArr.indexOf(activeEl);

		if (e.deltaY > 0) {
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
