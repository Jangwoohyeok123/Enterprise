import Form from '../Form/Form';
import './Tab.scss';

export default function Tab({ tab, activation, setOpt, userId }) {
	return (
		<div className='Tab'>
			<span className='menu' ref={tab}>
				<span
					onClick={() => {
						activation(0);
						setOpt({ type: 'interest' });
					}}>
					Interest Gallery
				</span>
				<span
					onClick={() => {
						activation(1);
						setOpt({ type: 'user', id: userId.current });
					}}>
					My Gallery
				</span>
			</span>

			<Form setOpt={setOpt} tab={tab} />
		</div>
	);
}
