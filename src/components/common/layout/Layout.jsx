import { useCallback, useEffect, useRef } from 'react';
import './Layout.scss';
import { useScroll } from '../../../hooks/useScroll';

export default function Layout({ children, title, className }) {
	const refFrame = useRef(null);
	const refTitle = useRef(null);

	const handleScroll = scroll => {
		console.log(scroll);
	};

	const { scrollTo, refEl } = useScroll(handleScroll, 0);
	useEffect(() => {
		scrollTo(0);
	}, []);

	return (
		<main className={className} ref={refFrame}>
			<h1 className='title' ref={refTitle}>
				{title}
			</h1>
			{children}
		</main>
	);
}

//  Layout component

/* 
  재렌더링이 될 때 마다 화면을 맨 위로 이동시키기 
	
*/
