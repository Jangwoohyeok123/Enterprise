import Visual from '../visual/Visual';
import './MainWrap.scss';
import Sec1 from '../sec1/Sec1';
import Sec2 from '../sec2/Sec2';
import { useScroll } from '../../../hooks/useScroll';
import { useCallback, useEffect, useRef } from 'react';

export default function MainWrap() {
	const { scrollTo, Frame } = useScroll();
	const scrollTarget = useRef(null);
	const scrollCount = useRef(2);

	// window.innerWidth, window.innerHeight * 3 - 140
	// 위치 찾는 걸 좀 연구하자

	useEffect(() => {
		scrollTo(0);
		scrollTarget.current = Frame?.querySelector('.scrollTarget');
		Frame?.addEventListener('mousewheel', () => {
			if (scrollCount.current === 2) {
				scrollTo(window.innerWidth);
				--scrollCount.current;
				return;
			}
			if (scrollCount.current === 1) {
				scrollTo(window.innerHeight * 3 - 140);
				--scrollCount.current;
				return;
			}
		});
	}, [scrollTo]);

	// const move = useCallback(() => {
	// 	new Anime(
	// 		Frame,
	// 		{ scroll: scrollTarget.current.offsetTop },
	// 		{
	// 			callback: () => --init.current
	// 		}
	// 	);
	// }, [Frame]);

	// const initAutoScroll = useCallback(
	// 	e => {
	// 		if (init.current && e.deltaY > 0) {
	// 			new Anime(
	// 				Frame,
	// 				{ scroll: scrollTarget.current.offsetTop },
	// 				{
	// 					callback: () => --init.current
	// 				}
	// 			);
	// 		}
	// 	},
	// 	[Frame]
	// );

	// const initAutoScroll = useCallback(
	// 	e => {
	// 		console.log('hello');
	// 		if (init.current && e.deltaY > 0) {
	// 			new Anime(
	// 				Frame,
	// 				{ scroll: scrollTarget.current.offsetTop },
	// 				{
	// 					callback: () => --init.current
	// 				}
	// 			);
	// 		}
	// 	},
	// 	[Frame]
	// );

	// useEffect(() => {
	// 	// 이동할 scrollTraget 을 찾아야한다.
	// 	scrollTarget.current = Frame?.querySelector('.scrollTarget');
	// 	Frame?.addEventListener('mousewheel', initAutoScroll);
	// 	return Frame?.removeEventListener('mousewheel', initAutoScroll);
	// }, [Frame, initAutoScroll]);

	return (
		<div className='MainWrap'>
			<Visual />
			{/* <Btns /> */}
			<Sec1 />
			<Sec2 />
		</div>
	);
}

// sec1 의 offsetTop 을 알면 new Anime 를 통해 이동할 수 있음
