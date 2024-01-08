import { useEffect, useRef } from 'react';
import { useScroll } from '../../../hooks/useScroll';
import './TopButton.scss';
import { BiSolidToTop } from 'react-icons/bi';
import { useLocation } from 'react-router-dom';

export default function TopButton() {
	const { scrollTo, getCurrentScroll, element: app } = useScroll();
	const refBtnTop = useRef(null);
	const location = useLocation();

	return (
		<>
			{location.pathname !== '/signup' && (
				<button
					ref={refBtnTop}
					className='TopButton'
					onClick={() => scrollTo(0)}>
					<BiSolidToTop className='icon' />
				</button>
			)}
		</>
	);
}

// app 에서 wheel 이벤트를 등록하고 fixed  된 요소의 scrollTop 을 측정하기
