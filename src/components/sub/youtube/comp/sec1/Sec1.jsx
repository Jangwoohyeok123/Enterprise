import { useRef } from 'react';
import './Sec1.scss';

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
					<div className='partners'>
						<span>Crystoper</span>
						<span>Author</span>
						<span>Author</span>
						<span>Author</span>
						<span>Author Kirem</span>
						<span>Author</span>
						<span>CatDoru</span>
						<div className='card'>&ABDGO</div>
					</div>
				</div>
			</div>
		</section>
	);
}
