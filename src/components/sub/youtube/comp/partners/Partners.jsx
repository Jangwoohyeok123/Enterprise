import { useEffect, useRef } from 'react';
import './Partners.scss';

export default function Partners() {
	const pointer = useRef(null);
	const youtubers = [
		'Crystoper',
		'Author',
		'Kim lim',
		'Alexander',
		'Author Kirem',
		'Soap people',
		'Hizacky'
	];

	const move = e => {
		const targetPosition = e.target.offsetTop - 25;
		console.log(targetPosition);
		pointer.current.style.top = targetPosition + 'px';
		e.target.style.fontWeight = 600;
	};

	return (
		<div className='Partners'>
			{youtubers.map((youtuber, idx) => {
				return (
					<span key={idx} onClick={move}>
						{youtuber}
					</span>
				);
			})}

			<div className='card' ref={pointer}>
				&ABDGO
			</div>
		</div>
	);
}
