import { useEffect, useRef } from 'react';
import { useScroll } from './useScroll';

export function useTargetScroll(count = 1) {
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
			if (
				Frame &&
				scrollCount.current > 0 &&
				!Frame.classList.contains('Mobile')
			) {
				scrollTo(scrollTargets.current[0].offsetTop);
				scrollCount.current--;
			}
		});
	}, [scrollTo, Frame]);
}

/* 
			if (Frame && scrollCount.current === 2) {
				scrollTo(
					scrollTargets.current[0].offsetTop + (window.innerHeight / 5) * 4
				);
				--scrollCount.current;
				return;
			}
			if (scrollCount.current === 1) {
				scrollTo(
					scrollTargets.current[1].offsetTop + (window.innerHeight / 5) * 4
				);
				--scrollCount.current;
				return;
			}

			console.log(scrollTargets.current[0].offsetTop);
			console.log(scrollTargets.current[1].offsetTop);
			console.log(scrollTargets.current[2].offsetTop);

*/
