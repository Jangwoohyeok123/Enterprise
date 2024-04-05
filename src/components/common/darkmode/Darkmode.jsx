import './Darkmode.scss';
import { MdOutlineDarkMode } from 'react-icons/md';
import { useGlobalData } from '../../../hooks/useGlobalData';
import { useCookie } from '../../../hooks/useCookie';

/* 
  사용자가 DarkMode 를 클릭할때마다 Dark Mode state 를 cookie 에 저장함
*/
export default function DarkMode() {
	const { createCookie } = useCookie();
	const { Dark, setDark } = useGlobalData();
	const handleDarkMode = () => {
		setDark(!Dark);
		createCookie('Dark', !Dark, 60 * 60 * 5);
	};

	return (
		<div className='Darkmode'>
			<MdOutlineDarkMode size={30} onClick={handleDarkMode} />
		</div>
	);
}
