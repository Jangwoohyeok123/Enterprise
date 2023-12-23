import './Modal.scss';
import { AnimatePresence, motion } from 'framer-motion';
import { SlClose } from 'react-icons/sl';
import { useDispatch, useSelector } from 'react-redux';

export default function Modal({ OpenModal, setOpenModal, children }) {
	const dispatch = useDispatch();
	const Modal = useSelector(store => store.modalReducer.modal);

	return (
		<AnimatePresence>
			{Modal && (
				<motion.aside
					className='Modal'
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
						{children}
					</motion.div>
					<span onClick={dispatch()}>
						<SlClose />
					</span>
				</motion.aside>
			)}
		</AnimatePresence>
	);
}

// animate x, y 는 변위 값이다.
// 모달이 열리면 dispatch
