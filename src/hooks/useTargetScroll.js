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
