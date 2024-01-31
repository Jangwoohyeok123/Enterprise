import './MainWrap.scss';
import Sec1 from '../sec1/Sec1';
import Sec2 from '../sec2/Sec2';
import { useScroll } from '../../../hooks/useScroll';
import { useEffect, useRef } from 'react';
import Movies from '../movies/Movies';
import { useQueryMain } from '../../../query/useQueryMain';

export default function MainWrap() {
	const { scrollTo, Frame } = useScroll();
	const scrollTargets = useRef(null);
	const scrollCount = useRef(2);

	// window.innerWidth, window.innerHeight * 3 - 140
	// 위치 찾는 걸 좀 연구하자

	useEffect(() => {
		scrollTo(0);
		scrollTargets.current = Frame?.querySelectorAll('.scrollTarget');
		// Frame 동기화 문제
		if (Frame) {
			// console.log(scrollTargets.current[0].offsetTop);
			// console.log(scrollTargets.current[1].offsetTop);
			// console.log(scrollTargets.current[2].offsetTop);
		}

		Frame?.addEventListener('mousewheel', () => {
			// if (Frame && scrollCount.current === 2) {
			// 	scrollTo(
			// 		scrollTargets.current[0].offsetTop + (window.innerHeight / 5) * 4
			// 	);
			// 	--scrollCount.current;
			// 	return;
			// }
			// if (scrollCount.current === 1) {
			// 	scrollTo(
			// 		scrollTargets.current[1].offsetTop + (window.innerHeight / 5) * 4
			// 	);
			// 	--scrollCount.current;
			// 	return;
			// }
		});
	}, [scrollTo, Frame]);

	return (
		<div className='MainWrap'>
			<Movies />
			<Sec1 />
			<Sec2 />
		</div>
	);
}

// sec1 의 offsetTop 을 알면 new Anime 를 통해 이동할 수 있음
