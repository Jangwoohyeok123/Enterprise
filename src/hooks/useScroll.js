import Anime from '../asset/anime';
import { useRef, useEffect } from 'react';

/* 
  scroll 기능을 훅으로 만들어 놓음 

  ex) navigation 을 클릭해서 화면이동이 일어날 때 화면이동이 일어나게 만듦
*/
export function useScrollIn(frame) {
	const frameRef = useRef(null);

	const scrollTo = targetPost => {
		new Anime(frameRef.current, { scroll: targetPost });
	};

	useEffect(() => {
		frameRef.current = document.querySelector(frame);
	}, []);

	return { scrollTo };
}
