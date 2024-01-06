import { useCallback, useEffect, useRef } from 'react';
import './Layout.scss';
import { useScroll } from '../../../hooks/useScroll';

export default function Layout({ children, title, className }) {
	const { scrollTo, getCurrentScroll, scrollFrame } = useScroll();
	const refFrame = useRef(null);
	const refTitle = useRef(null);
	const refBtnTop = useRef(null);

	const handleScroll = useCallback(
		num => {
			getCurrentScroll() >= num
				? refBtnTop.current?.classList.add('on')
				: refBtnTop.current?.classList.remove('on');
		},
		[getCurrentScroll]
	);

	useEffect(() => {
		scrollTo(0);
	}, [scrollTo]);

	return (
		<main className={className} ref={refFrame}>
			<h1 className='title' ref={refTitle}>
				{title}
			</h1>
			{children}
			<button
				ref={refBtnTop}
				className='btnTop'
				onClick={() => console.log('hello world')}></button>
		</main>
	);
}

//  Layout component

/* 
  재렌더링이 될 때 마다 화면을 맨 위로 이동시키기 
	
*/
