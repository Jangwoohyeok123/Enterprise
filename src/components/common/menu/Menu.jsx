import { useDispatch, useSelector } from 'react-redux';
import './Menu.scss';
import CLIENT_TABLES from '../../../store/actionTables/clientTable';
import { AnimatePresence, motion } from 'framer-motion';
import { SlClose } from 'react-icons/sl';
import { NavLink, Link } from 'react-router-dom';

export default function Menu() {
	const dispatch = useDispatch();
	const open = useSelector(store => store.menuReducer.open);

	return (
		<AnimatePresence>
			{open && (
				<motion.aside
					className='Menu'
					initial='hidden'
					animate='visible'
					exit='exit'
					transition={{ duration: 0.5 }}
					variants={{
						hidden: { opacity: 0, x: '-100%' },
						visible: { opacity: 1, x: '0%' },
						exit: { opacity: 0, x: '-100%', transition: { delay: 0.3, duration: 0.6 } }
					}}>
					<div className='layout'>
						<div className='top'>
							<header className='menu-header'>
								{/* logo 는 클릭하면 홈으로 이동 */}
								<h3>
									<Link to='/'>LOGO</Link>
								</h3>
								<div className='close' onClick={() => dispatch({ type: CLIENT_TABLES.MENU.open, payload: false })}>
									<SlClose />
								</div>
							</header>
							<nav className='menu-nav'>
								<NavLink to='/department' activeClassName={'on'}>
									DEPARTMENT
								</NavLink>
								<NavLink to='/youtube' activeClassName={'on'}>
									YOUTUBE
								</NavLink>
								<NavLink to='/gallery' activeClassName={'on'}>
									GALLERY
								</NavLink>
								<NavLink to='/community' activeClassName={'on'}>
									COMMUNITY
								</NavLink>
								<NavLink to='/contact' activeClassName={'on'}>
									CONTACT
								</NavLink>
							</nav>
							<div className='signup'>
								<Link to='/signup'>SIGN UP</Link>
							</div>
						</div>

						<div className='bottom'>
							<div className='menu-footer'>
								<span>lorme</span>
								<span>kleds</span>
								<span>allow</span>
							</div>
						</div>
					</div>
				</motion.aside>
			)}
		</AnimatePresence>
	);
}

/* 
<motion.aside
					className='Menu'
					initial='hidden'
					animate='visible'
					exit='exit'
					transition={{ duration: 1 }}
					variants={{
						hidden: { opacity: 0, x: '-100%', scale: 0 },
						visible: { opacity: 1, x: '0%', scale: 1 },
						exit: { opacity: 0, x: '100%', scale: 0, transition: { delay: 0.3, duration: 0.6 } }
					}}>
					<motion.div
						className='imgContainer'
						initial='hidden'
						animate='visible'
						exit='exit'
						transition={{ duration: 0.5, delay: 1 }}
						variants={{
							hidden: { opacity: 0 },
							visible: { opacity: 1 },
							exit: { opacity: 0, transition: { delay: 0 } }
						}}>
						helloworld
					</motion.div>
					<span onClick={dispatch({ type: CLIENT_TABLES.MENU.open, payload: false })}>
						<SlClose />
					</span>
				</motion.aside>


*/
