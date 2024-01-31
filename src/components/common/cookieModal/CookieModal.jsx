import { useRef, useState } from 'react';
import './CookieModal.scss';
import { SlClose } from 'react-icons/sl';
import { useCookie } from '../../../hooks/useCookie';
import { BiCookie } from 'react-icons/bi';

// 'name', 'asd'
export default function Cookie({ wid, ht, children }) {
	const { createCookie, isCookie } = useCookie();
	const [Open, setOpen] = useState(isCookie('name=asd'));
	const checkBox = useRef(null);
	const handleClose = e => {
		// ref 로 고치면 됨
		const isChecked = checkBox.current.checked;
		if (isChecked) createCookie('name', 'asd', 20);
		setOpen(!Open); // App 이 실행되면 Open 한다.
	};

	return (
		<>
			{!Open && (
				<aside
					className='CookieModal'
					style={{
						width: wid,
						height: ht,
						marginLeft: -wid / 2,
						marginTop: -ht / 2
					}}>
					<div className='cookie-icon'>
						<BiCookie />
					</div>

					<p className='cookie-content'>{children}</p>

					<div className='buttons'>
						<button
							onClick={e => {
								handleClose(e);
							}}>
							Accept
						</button>

						<button
							onClick={e => {
								handleClose(e);
							}}>
							Refuse
						</button>
					</div>

					{/* <nav>
						<input type='checkbox' ref={checkBox} />
						<span>오늘하루 팝업 그만보기</span>
					</nav>
					<button></button> */}
				</aside>
			)}
		</>
	);
}
