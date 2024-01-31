import { useRef } from 'react';
import './Layout.scss';

// Layout scroll 적용은 나중에 할 것!
export default function Layout({ children, title, src, className }) {
	const refFrame = useRef(null);
	const refTitle = useRef(null);

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
