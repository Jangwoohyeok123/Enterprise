import { useState } from 'react';
import { useScroll } from '../../../hooks/useScroll';
import Image from '../../common/img/Image';
import './Sec1.scss';

export default function Sec1() {
	const handleScroll = modifiedScroll => {};
	const [SecArr, setSecArr] = useState([1, 2, 3]);

	const { refEl } = useScroll(handleScroll);
	const path = process.env.PUBLIC_URL;

	return (
		<section className='Sec1 myScroll'>
			<div className='wrap'>
				<div className='subtit1'>NORM SERVICES</div>
				<div className='subtit2'>LSOSERVIESSDAMPJALL</div>
				{SecArr.map((_, idx) => {
					const number = idx + 1;
					return (
						<div className={`item`}>
							<div className='img'>
								<Image
									className='sec1Img'
									src={`${path}/img/main/pic${number}.jpg`}
								/>
							</div>
							<div className='txt'>
								<div className='numbering'>
									<h2>0{number}</h2>
									<span>/ DEPARTMENT</span>
								</div>
								<div className='intro'>
									<h3>Construction Building</h3>
									<p>
										Lorem ipsum dolor sit amet consectetur adipisicing elit.
										Quaerat aspernatur distinctio quas. Eos perspiciatis facere
										aut dolorem quam corrupti aliquid, dolorum, saepe quas
										quaerat beatae qui? Reiciendis id nam sint! Lorem ipsum
										dolor sit amet.
									</p>
								</div>
								<span className='to'>DEPARTMENT</span>
							</div>
						</div>
					);
				})}
			</div>
		</section>
	);
}
