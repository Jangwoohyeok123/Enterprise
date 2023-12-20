import './Header.scss';
import { NavLink, Link } from 'react-router-dom';
import { MdOutlineDarkMode } from 'react-icons/md';
import { useLocation } from 'react-router-dom';
import { FiMenu } from 'react-icons/fi';

export default function Header({ Dark, setDark, viewType }) {
	const handleDarkMode = () => {
		setDark(!Dark);
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
					</ul>
					<div className='darkmode icons'>
						<NavLink to='/signup' className='signup' activeClassName={'on'}>
							Signup
						</NavLink>

						<MdOutlineDarkMode size={30} onClick={handleDarkMode} />
						{viewType == 'Tablet' || viewType == 'Mobile' ? (
							<FiMenu
								size={30}
								onClick={() => {
									console.log('open modal');
								}}
							/>
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
