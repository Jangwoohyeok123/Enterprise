import './Modal.scss';
import { AnimatePresence, motion } from 'framer-motion';

export default function Modal({ selectedId, imgSrc, OpenModal, setOpenModal }) {
	return (
		<AnimatePresence>
			{OpenModal && (
				<motion.div
					layoutId={selectedId}
					className='Modal'
					initial={{ opacity: 0, x: '-100%', scale: 0 }}
					animate={{ opacity: 1, x: '0%', scale: 1 }}
					exit={{ opacity: 0, y: '100%', scale: 2, transition: { delay: 0.5 } }}
					transition={{ duration: 1 }}
				>
					<motion.button onClick={() => setOpenModal(false)} className='exit' initial={{}} animate={{}}>
						x
					</motion.button>
					<motion.img
						src={imgSrc}
						alt={selectedId + "'s full screen image"}
						className='img'
						initial={{}}
						animate={{}}
					/>
				</motion.div>
			)}
		</AnimatePresence>
	);
}

/* 
<AnimatePresence>
			{Open && (
				<motion.aside
					className='Modal'
					initial={{ opacity: 0, x: '-100%', scale: 0 }}
					animate={{ opacity: 1, x: '0%', scale: 1 }}
					exit={{ opacity: 0, y: '100%', scale: 2, transition: { delay: 0.5 } }}
					transition={{ duration: 1 }}
				>
					<motion.div
						className='con'
						initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}
						exit={{ opacity: 0, transition: { delay: 0 } }}
						transition={{ duration: 0.5, delay: 1 }}
					>
						{children}
					</motion.div>
					<span onClick={() => setOpen(false)}>close</span>
				</motion.aside>
			)}
		</AnimatePresence>

*/
