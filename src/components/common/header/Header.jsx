import './Header.scss';
import { NavLink, Link } from 'react-router-dom';
import { MdOutlineDarkMode } from 'react-icons/md';
import { FiMenu } from 'react-icons/fi';
import ThemeControl from '../themeControl/ThemeControl';
import { GlobalContext } from '../../../hooks/useGlobalData';
import { useLocation } from 'react-router-dom';
import { useContext } from 'react';

export default function Header() {
	const { Dark, setDark, OpenMenu, setOpenMenu, ViewType } =
		useContext(GlobalContext);

	const handleDarkMode = () => setDark(!Dark);
	const handleMenu = () => {
		setOpenMenu(!OpenMenu);
	};
	const location = useLocation();

	return (
		<>
			{location.pathname !== '/signup' && (
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

						{ViewType === 'Tablet' || ViewType === 'Mobile' ? (
							<span className='icon' onClick={handleMenu}>
								<FiMenu />
							</span>
						) : null}
					</div>
				</header>
			)}
		</>
	);
}

