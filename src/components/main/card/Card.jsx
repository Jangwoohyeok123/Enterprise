import './Card.scss';

export default function Card({ Icon, title, content, SpecialCard }) {
	return !SpecialCard ? (
		<div className='Card'>
			<Icon className='icon' />
			<h3>{title}</h3>
			<p>{content}</p>
		</div>
	) : (
		SpecialCard
	);
}

/* 

*/
