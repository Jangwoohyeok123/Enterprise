import './Pics.scss';
import { useScroll } from '../../../hooks/useScroll';
import { useEffect } from 'react';

export default function Pics() {
	const { app, getCurrentScroll } = useScroll();

	const handleScroll = num => {
		getCurrentScroll();

		/*
			사건? Layout 컴포넌트가 마운트된 후 App component 에서 scroll 발생
		*/
	};

	useEffect(() => {
		app.current.addEventListener('scroll', () => console.log('hello'));
	}, []);

	return (
		<section className='Pics myScroll'>
			<div className='box'></div>
		</section>
	);
}
