import './ThemeControl.scss';
import { useCookie } from '../../../hooks/useCookie';
import { useRef, useState } from 'react';

export default function ThemeControl() {
	const { createCookie, isCookie } = useCookie();
	const inputEl = useRef(null);
	const [InputColor, setInputColor] = useState('#e59617');

	if (isCookie('theme')) {
		// 현재 쿠키값에서 'theme=' 다음 문자값을 가져와서 ; 기준으로 배열분리한뒤 첫 번째 값이 theme 컬러값
		// 해당 쿠키 컬라값으로 자동 세팅
		// 쿠키가 없다면 기존 --pointColor 활용
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
  1. 컬러팔레트에서 발생한 색을 코드로 쿠키에 저장 
  2. 쿠키를 이용해 App 컴포넌트가 마운트시 pointColor 에 등록된 변수값을 바꿔치기한다. 
*/
