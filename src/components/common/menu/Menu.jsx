import { useDispatch, useSelector } from 'react-redux';
import './Menu.scss';
import CLIENT_TABLES from '../../../store/actionTables/clientTable';
import { AnimatePresence, motion } from 'framer-motion';
import { SlClose } from 'react-icons/sl';

export default function Menu() {
	const dispatch = useDispatch();
	const open = useSelector(store => store.menuReducer.open);

	return (
		<AnimatePresence>
			{open && (
				<motion.div className='layout'>
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
						<div className='close' onClick={() => dispatch({ type: CLIENT_TABLES.MENU.open, payload: false })}>
							<SlClose />
						</div>

						<motion></motion>
					</motion.aside>
				</motion.div>
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
