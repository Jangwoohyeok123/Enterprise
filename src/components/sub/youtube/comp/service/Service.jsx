import { useState } from 'react';
import './Service.scss';

export default function Service() {
	const [Categorys, setCategorys] = useState([]);

	return (
		<figure className='Service'>
			<div className='Service-title'>Working Vides & Description</div>
			<div className='category'>
				<span className='sports'>Sports</span>
				<span className='games'>Game</span>
				<span className='asmrs'>Asmr</span>
				<span className='citys'>City</span>
			</div>
		</figure>
	);
}
