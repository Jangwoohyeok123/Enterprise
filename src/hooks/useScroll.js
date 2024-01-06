import Anime from '../asset/anime';
import { useRef, useEffect } from 'react';

/* 
  scroll 기능을 훅으로 만들어 놓음 

  ex) navigation 을 클릭해서 화면이동이 일어날 때 화면이동이 일어나게 만듦
*/
export function useScroll(el = '.App') {
	const app = useRef(null);

	const scrollTo = targetPosition => {
		new Anime(app.current, { scroll: targetPosition });
	};

	const getCurrentScroll = () => {
		const scroll = app.current.scrollTop;
		return scroll;
	};

	useEffect(() => {
		app.current = document.querySelector(el);
	}, [el]);

	return { scrollTo, getCurrentScroll, app };
}
