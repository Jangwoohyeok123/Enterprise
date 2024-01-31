import './MainWrap.scss';
import Sec1 from '../sec1/Sec1';
import Sec2 from '../sec2/Sec2';
import { useScroll } from '../../../hooks/useScroll';
import { useEffect, useRef } from 'react';
import Movies from '../movies/Movies';

export default function MainWrap() {
	const { scrollTo, Frame } = useScroll();
	const scrollTargets = useRef(null);
	const scrollCount = useRef(0);

	useEffect(() => {
		scrollTargets.current = Frame?.querySelectorAll('.scrollTarget');
		// Frame 동기화 문제
		if (Frame) {
			scrollCount.current = scrollTargets.current.length;
		}

		Frame?.addEventListener('mousewheel', () => {
			if (Frame && scrollCount.current > 0) {
				scrollTo(701);
				scrollCount.current = 0;
			}
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
