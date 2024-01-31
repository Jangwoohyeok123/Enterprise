import './ThemeControl.scss';
import { useCookie } from '../../../hooks/useCookie';
import { useRef, useState } from 'react';

export default function ThemeControl() {
	const { createCookie, isCookie } = useCookie();
	const inputEl = useRef(null);
	const [InputColor, setInputColor] = useState('#e59617');

	if (isCookie('theme')) {
		document.body.style.setProperty(
			'--subPoint',
			document.cookie.split('theme=')[1].split(';')[0]
		);
	}

	const changeThemeColor = () => {
		const color = inputEl.current.value;
		createCookie('theme', color, 20);
		document.body.style.setProperty('--subPoint', color);
		setInputColor(color);
	};

	return (
		<nav className='ThemeControl'>
			<input
				type='color'
				value={InputColor}
				ref={inputEl}
				onChange={changeThemeColor}
			/>
		</nav>
	);
}

/* 
  1. 사용자가 고른 색을 코드로 쿠키에 저장 
  2. 쿠키를 이용해 App 컴포넌트가 마운트시 pointColor 
*/
