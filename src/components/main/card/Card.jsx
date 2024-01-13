import './Card.scss';

export default function Card({ Icon, title, content }) {
	return (
		<div className='Card'>
			<Icon size={70} className='icon' />
			<h3></h3>
			<p></p>
		</div>
	);
}
