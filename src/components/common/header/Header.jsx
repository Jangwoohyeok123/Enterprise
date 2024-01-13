import './Header.scss';
import { NavLink, Link } from 'react-router-dom';
import { MdOutlineDarkMode } from 'react-icons/md';
import { FiMenu } from 'react-icons/fi';
import ThemeControl from '../themeControl/ThemeControl';
import { GlobalContext, useGlobalData } from '../../../hooks/useGlobalData';
import DarkMode from '../darkmode/Darkmode';
import { useLocation } from 'react-router-dom';
import { useContext, useRef, useState } from 'react';
import Menu from '../menu/Menu';
import { useScroll } from '../../../hooks/useScroll';

export default function Header({ viewType }) {
	// const { OpenMenu, setOpenMenu, Dark, setDark } = useGlobalData();
	/* App 을 실행하면 다크모드 쿠키에 저장하기 */
	const { Dark, setDark, OpenMenu, setOpenMenu } = useContext(GlobalContext);
	/*  */
	const handleDarkMode = () => setDark(!Dark);
	const handleMenu = () => {
		// console.log(setOpenMenu);
		setOpenMenu(!OpenMenu);
		console.log('hanlder 연결');
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

						{viewType === 'Tablet' || viewType === 'Mobile' ? (
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

/* 
  다른 컴포넌트에서 state 를 변경하는 구조인 경우 문제인가? 

*/
