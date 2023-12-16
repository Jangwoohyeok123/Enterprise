import './Header.scss';
import { NavLink, Link } from 'react-router-dom';
import { MdOutlineDarkMode } from 'react-icons/md';
import { FiMenu } from 'react-icons/fi';

export default function Header({ Dark, setDark, viewType }) {
	const handleDarkMode = () => {
		setDark(!Dark);
	};
	return (
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
				{viewType == 'Tablet' || viewType == 'Mobile' ? <FiMenu size={30} /> : null}
			</div>
		</header>
	);
}
