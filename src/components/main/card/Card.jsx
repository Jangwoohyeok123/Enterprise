import './Card.scss';

export default function Card({ Icon, title, content }) {
	return (
		<div className='Card'>
			<Icon size={100} className='icon' />
		</div>
	);
}
