import { useEffect, useRef, useState } from 'react';
import Anime from '../asset/anime';

export function useTargetScroll(count) {
	const [Frame, setFrame] = useState(null);
	const scrollTargets = useRef(null);

	useEffect(() => {
		setFrame(document.querySelector('.App'));
	}, []);

	useEffect(() => {
		// Frame 동기화 문제
		if (Frame) {
			scrollTargets.current = Frame?.querySelectorAll('.scrollTarget');
			Frame.addEventListener('mousewheel', () => {
				//
			});
		}
	}, [Frame]);
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
