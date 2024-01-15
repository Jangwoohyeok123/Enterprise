import { useRef } from 'react';
import './Sec1.scss';
import Partners from '../partners/Partners';

export default function Sec1() {
	const path = useRef(process.env.PUBLIC_URL);

	return (
		<section className='Youtube-firstSection'>
			<div className='leftImg'>
				<div className='text'>
					<div>Loremipsumdolor sitamet.</div>
					<div>Let's talk</div>
				</div>
				<div className='circle'>asum</div>
			</div>

			<div className='right'>
				<img src={`${path.current}/img/youtube/main.jpg`} alt='modern-house' />

				<div className='text'>
					<h2>Our Trusted Partners</h2>
					<p>
						Lorem ipsum dolor sit amet consectetur adipisicing elit. Veritatis
						ad molestias quis accusamus voluptates aperiam sint mollitia numquam
						at quidem vel tenetur, perspiciatis cum. Perspiciatis, possimus rem.
						Nulla, tempora facere?
					</p>
					<Partners />
				</div>
			</div>
		</section>
	);
}
