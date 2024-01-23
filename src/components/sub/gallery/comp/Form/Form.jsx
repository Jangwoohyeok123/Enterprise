import { FaSearch } from 'react-icons/fa';
import './Form.scss';
import { useEffect, useState } from 'react';
import { useDebounce } from '../../../../../hooks/useDebounce';

export default function SearchBar({ setOpt, tab }) {
	const [SearchInput, setSearchInput] = useState('');
	const DebouncedVal = useDebounce(SearchInput);

	const handleChange = e => {
		setSearchInput(e.target.value);
	};

	const handleSubmit = e => {
		e.preventDefault();
		setOpt({ type: 'search', keyword: SearchInput });
		Array.from(tab.current.children).forEach(menu => {
			menu.classList.remove('on');
		});
	};

	useEffect(() => {
		if (DebouncedVal.length > 0) {
			setOpt({ type: 'search', keyword: DebouncedVal });
			Array.from(tab.current.children).forEach(menu => {
				menu.classList.remove('on');
			});
		}
	}, [DebouncedVal]);

	return (
		<form className='search' onSubmit={e => handleSubmit(e)}>
			<input
				type='text'
				placeholder='Search'
				value={SearchInput}
				onChange={handleChange}></input>
			<FaSearch className='icon' onClick={e => handleSubmit(e)} />
		</form>
	);
}
