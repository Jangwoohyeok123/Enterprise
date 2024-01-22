import { useCallback, useEffect, useRef } from 'react';
import './Layout.scss';
import { useScroll } from '../../../hooks/useScroll';

export default function Layout({ children, title, src, className }) {
	const refFrame = useRef(null);
	const refTitle = useRef(null);
	const refBtnTop = useRef(null);

	return (
		<main className={className} ref={refFrame}>
			{src && (
				<div className='layoutImageBox'>
					<img src={src} alt='layoutImage'></img>
				</div>
			)}

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
