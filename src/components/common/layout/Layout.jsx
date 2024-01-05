import { useEffect, useRef } from 'react';
import './Layout.scss';
import { useScrollIn } from '../../../hooks/useScroll';

export default function Layout({ children, title, className }) {
	// const { scrollTo } = useScrollIn('.App');

	// useEffect(() => {
	// 	scrollTo(0);
	// });

	return (
		<main className={className}>
			<h1 className='title'>{title}</h1>
			{children}
		</main>
	);
}
