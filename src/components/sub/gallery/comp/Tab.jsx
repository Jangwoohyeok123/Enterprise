import { FaSearch } from 'react-icons/fa';
import './Tab.scss';

export default function Tab({
	tab,
	searchInput,
	activation,
	setOpt,
	userId,
	handleSubmit
}) {
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

			<form className='search' onSubmit={e => handleSubmit(e)}>
				<input type='text' placeholder='Search' ref={searchInput}></input>
				<FaSearch className='icon' onClick={e => handleSubmit(e)} />
			</form>
		</div>
	);
}
