import { FaSearch } from 'react-icons/fa';
import './Form.scss';

export default function Form({ handleSubmit, searchInput }) {
	return (
		<form className='search' onSubmit={e => handleSubmit(e)}>
			<input type='text' placeholder='Search' ref={searchInput}></input>
			<FaSearch className='icon' onClick={e => handleSubmit(e)} />
		</form>
	);
}
