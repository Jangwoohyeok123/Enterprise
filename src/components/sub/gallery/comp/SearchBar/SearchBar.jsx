import { FaSearch } from 'react-icons/fa';
import './SearchBar.scss';
import { useEffect, useRef, useState } from 'react';
import { useDebounce } from '../../../../../hooks/useDebounce';

export default function SearchBar({ setOpt, tab }) {
	const [SearchInput, setSearchInput] = useState('');
	const DebouncedVal = useDebounce(SearchInput);
	const input = useRef(null);

	const handleChange = e => {
		setSearchInput(e.target.value);
	};

	const handleFocus = e => {
		input.current.classList.add('on');
	};

	const handleBlur = e => {
		input.current.classList.remove('on');
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
		<form className='SearchBar' onSubmit={e => handleSubmit(e)}>
			<div
				className='input-wrapper'
				ref={input}
				onFocus={handleFocus}
				onBlur={handleBlur}>
				<input
					type='text'
					placeholder='Search'
					value={SearchInput}
					onChange={handleChange}></input>
				<FaSearch className='icon' onClick={e => handleSubmit(e)} />
			</div>
		</form>
	);
}
