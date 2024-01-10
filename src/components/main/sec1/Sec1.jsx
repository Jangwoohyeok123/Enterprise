import { useScroll } from '../../../hooks/useScroll';
import Image from '../../common/img/Image';
import './Sec1.scss';

export default function Sec1() {
	const handleScroll = modifiedScroll => {};

	const { refEl } = useScroll(handleScroll);
	const path = process.env.PUBLIC_URL;

	return (
		<section className='Sec1 myScroll'>
			<div className='wrap'>
				<div className={`item${1}`}>
					<div className='left'>
						<div className='subtit'>LOR SERVICES</div>
						<Image className='sec1Img' src={`${path}/img/main/pic${1}.jpg`} />
					</div>
					<div className='right'>
						<div className='numbering'>
							<h2>0{1}</h2>
							<span>/ DEPARTMENT</span>
						</div>
						<div className='intro'>
							<h3>Construction Building</h3>
							<p>
								Lorem ipsum dolor sit amet consectetur adipisicing elit. Quaerat
								aspernatur distinctio quas. Eos perspiciatis facere aut dolorem
								quam corrupti aliquid, dolorum, saepe quas quaerat beatae qui?
								Reiciendis id nam sint! Lorem ipsum dolor sit amet.
							</p>
						</div>
						<span className='to'>DEPARTMENT</span>
					</div>
				</div>
				<div className={`item${2}`}>
					<div className='left'>
						<div className='subtit'>LOR SERVICES</div>
						<Image className='sec1Img' src={`${path}/img/main/pic${2}.jpg`} />
					</div>
					<div className='right'>
						<div className='numbering'>
							<h2>0{2}</h2>
							<span>/ DEPARTMENT</span>
						</div>
						<div className='intro'>
							<h3>Construction Building</h3>
							<p>
								Lorem ipsum dolor sit amet consectetur adipisicing elit. Quaerat
								aspernatur distinctio quas. Eos perspiciatis facere aut dolorem
								quam corrupti aliquid, dolorum, saepe quas quaerat beatae qui?
								Reiciendis id nam sint! Lorem ipsum dolor sit amet.
							</p>
						</div>
						<span className='to'>DEPARTMENT</span>
					</div>
				</div>
				<div className={`item${3}`}>
					<div className='left'>
						<div className='subtit'>LOR SERVICES</div>
						<Image className='sec1Img' src={`${path}/img/main/pic${3}.jpg`} />
					</div>
					<div className='right'>
						<div className='numbering'>
							<h2>0{3}</h2>
							<span>/ DEPARTMENT</span>
						</div>
						<div className='intro'>
							<h3>Construction Building</h3>
							<p>
								Lorem ipsum dolor sit amet consectetur adipisicing elit. Quaerat
								aspernatur distinctio quas. Eos perspiciatis facere aut dolorem
								quam corrupti aliquid, dolorum, saepe quas quaerat beatae qui?
								Reiciendis id nam sint! Lorem ipsum dolor sit amet.
							</p>
						</div>
						<span className='to'>DEPARTMENT</span>
					</div>
				</div>
			</div>
		</section>
	);
}
