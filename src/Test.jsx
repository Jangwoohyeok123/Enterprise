import { useEffect, useRef, useState } from 'react';
import './Test.scss';

export default function Test() {
	const defOpt = useRef({
		frame: '.wrap',
		items: '.myScroll',
		base: -window.innerHeight / 2,
		isAuto: false
	});
	const resultOpt = useRef({ ...defOpt.current, ...opt });
	const [Num, setNum] = useState(0);
	//const [Mounted, setMounted] = useState(true);

	const isAutoScroll = useRef(resultOpt.current.isAuto);
	const wrap = useRef(null);
	const secs = useRef(null);
	const btns = useRef(null);
	const baseLine = useRef(resultOpt.current.base);
	const isMotion = useRef(false);

	const activation = () => {
		const scroll = wrap.current?.scrollTop;

		secs.current.forEach((_, idx) => {
			if (scroll >= secs.current[idx].offsetTop + baseLine.current) {
				const btnsArr = btns.current?.querySelectorAll('li');
				btnsArr?.forEach(btn => btn.classList.remove('on'));
				btns.current?.querySelectorAll('li')[idx]?.classList.add('on');
			}
		});
	};

	const moveScroll = idx => {
		if (isMotion.current) return;
		isMotion.current = true;
		new Anime(
			wrap.current,
			{ scroll: secs.current[idx].offsetTop },
			{ callback: () => (isMotion.current = false) }
		);
	};

	const autoScroll = useCallback(
		e => {
			const btnsArr = Array.from(btns.current.children);
			const activeEl = btns.current.querySelector('li.on');
			const activeIndex = btnsArr.indexOf(activeEl);

			if (e.deltaY > 0) {
				activeIndex !== Num - 1 && moveScroll(activeIndex + 1);
			} else {
				activeIndex !== 0 && moveScroll(activeIndex - 1);
			}
		},
		[Num]
	);

	const modifyPos = () => {
		const btnsArr = Array.from(btns.current.children);
		const activeEl = btns.current.querySelector('li.on');
		const activeIndex = btnsArr.indexOf(activeEl);
		wrap.current.scrollTop = secs.current[activeIndex].offsetTop;
	};

	const throttledActivation = useThrottle(activation);
	const throttledModifyPos = useThrottle(modifyPos, 200);

	useEffect(() => {
		// frame 이 필요하다.
		wrap.current = document.querySelector(resultOpt.current.frame);

		// section 의 개수를 Number 로 지정한다.
		setNum(secs.current.length);


		// scroll 이 일어날 때마다 영역을 확인해가며 activation 을 시도한다.
		wrap.current.addEventListener('scroll', throttledActivation);
	}, []);

	return <div className='Test'>Test</div>;
}
