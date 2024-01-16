import { useRef } from 'react';
import './Sec1.scss';

export default function Sec1() {
	const path = useRef(process.env.PUBLIC_URL);

	return (
		<section className='Youtube-firstSection'>
			<div className='mainImage-box'>
				<img src={`${path.current}/img/youtube/main.jpg`} alt='mainImage' />
			</div>
		</section>
	);
}
