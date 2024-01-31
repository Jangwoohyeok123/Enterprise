import { useState } from 'react';
import Image from '../../common/img/Image';
import './Sec1.scss';
import Linetext from '../linetext/Linetext';

export default function Sec1() {
	const [SecArr, setSecArr] = useState([1, 2, 3]);

	const path = process.env.PUBLIC_URL;

	return (
		<section className='Sec1 scrollTarget'>
			<Linetext tit1='NORM SERVICES' tit2='LSOSERVIESSDAMPJALL' />
			<div className='wrap'>
				{SecArr.map((_, idx) => {
					const number = idx + 1;
					return (
						<div className='item '>
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
										aut dolorem quam corrupti aliquid, dolorum, saepe quasaut
										dolorem quam corrupti aliquid, dolorum, saepe quas
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
