import { useRef, useState } from 'react';
import './CookieModal.scss';
import { useCookie } from '../../../hooks/useCookie';
import { BiCookie } from 'react-icons/bi';

export default function Cookie({ wid, ht, children }) {
	const { createCookie, isCookie } = useCookie();
	const [Open, setOpen] = useState(
		isCookie('Main-cookie=Accept') || isCookie('Main-cookie=Refuse')
	);

	const accept = () => {
		setOpen(!Open);
		createCookie('Main-cookie', 'Accept', 300);
	};

	const refuse = () => {
		setOpen(!Open);
		createCookie('Main-cookie', 'Refuse', 300);
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
						<button onClick={accept}>Accept</button>
						<button onClick={refuse}>Refuse</button>
					</div>
				</aside>
			)}
		</>
	);
}
