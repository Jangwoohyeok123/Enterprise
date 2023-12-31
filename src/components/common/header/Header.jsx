import './Header.scss';
import { NavLink, Link } from 'react-router-dom';
import { MdOutlineDarkMode } from 'react-icons/md';
import { useLocation } from 'react-router-dom';
import { FiMenu } from 'react-icons/fi';
import { useState } from 'react';
import Menu from '../menu/Menu';
import { useDispatch, useSelector } from 'react-redux';
import CLIENT_TABLES from '../../../store/actionTables/clientTable';
import ThemeControl from '../themeControl/ThemeControl';

export default function Header({ viewType }) {
	const dispatch = useDispatch();
	const Dark = useSelector(store => store.darkReducer.dark);
	const handleDarkMode = () => {
		dispatch({ type: CLIENT_TABLES.DARK.start, payload: !Dark });
	};
	const [Bl, setMenu] = useState(true);
	const open = useSelector(store => store.menuReducer.open);

	const location = useLocation();

	return (
		<>
			{Bl && <Menu />}

			{location.pathname !== '' && (
				<header className='Header'>
					<h1>
						<Link to='/'>LOGO</Link>
					</h1>
					<ul>
						<li>
							<NavLink to='/department' activeClassName={'on'}>
								Department
							</NavLink>
						</li>
						<li>
							<NavLink to='/youtube' activeClassName={'on'}>
								Youtube
							</NavLink>
						</li>
						<li>
							<NavLink to='/gallery' activeClassName={'on'}>
								Gallery
							</NavLink>
						</li>
						<li>
							<NavLink to='/community' activeClassName={'on'}>
								Community
							</NavLink>
						</li>
						<li>
							<NavLink to='/contact' activeClassName={'on'}>
								Contact
							</NavLink>
						</li>
						<li>
							<NavLink to='/signup' activeClassName={'on'}>
								Signup
							</NavLink>
						</li>
					</ul>
					<div className='darkmode icons'>
						<span className='icon'>
							<ThemeControl />
						</span>

						<span className='icon'>
							<MdOutlineDarkMode onClick={handleDarkMode} />
						</span>

						{viewType == 'Tablet' || viewType == 'Mobile' ? (
							<span className='icon'>
								<FiMenu
									onClick={() => {
										dispatch({ type: CLIENT_TABLES.MENU.open, payload: true });
									}}
								/>
							</span>
						) : null}
					</div>
				</header>
			)}
		</>
	);
}
// 모달이 닫혀있으면 dispatch
// 즉, action 이 2개 필요함
// 전역 state 를 만든다.
// 1. 리듀서를 만든다. 2. action 을 만든다.
