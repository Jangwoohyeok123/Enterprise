import './Modal.scss';
import { AnimatePresence, motion } from 'framer-motion';

export default function Modal({ selectedId, imgSrc, initX, initY, dx, dy, OpenModal, setOpenModal }) {
	return (
		<AnimatePresence>
			{OpenModal && (
				<motion.div layoutId={selectedId} className='Modal' animate={{ x: [initX, dx], y: [initY, dy] }}>
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

// animate x, y 는 변위 값이다.
