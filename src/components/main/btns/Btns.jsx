import { useEffect, useRef, useState } from 'react';
import './Btns.scss';

export default function Btns() {
	const [Index, setIndex] = useState(0);

	const num = useRef(4);

	// 현재 num 이 원하는대로 초기화 안돼 num 에 상수값을 준 상황임
	useEffect(() => {
		num.current = document.body.querySelectorAll('myScroll').length;
	}, []);

	return (
		<ul className='Btns'>
			{Array(num.current)
				.fill()
				.map((_, idx) => {
					return <li key={idx} className={Index ? 'on' : ''}></li>;
				})}
		</ul>
	);
}
