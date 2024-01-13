import './Card.scss';

export default function Card({ Icon, title, content }) {
	return (
		<div className='Card'>
			<Icon size={70} className='icon' />
			<h3>{title}</h3>
			<p>{content}</p>
		</div>
	);
}
