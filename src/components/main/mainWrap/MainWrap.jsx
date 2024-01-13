// import Info from '../info/Info';
import Visual from '../visual/Visual';
import './MainWrap.scss';
import Btns from '../btns/Btns';
import { useRef } from 'react';
import { useLocation } from 'react-router-dom/cjs/react-router-dom.min';
import Sec1 from '../sec1/Sec1';
import Sec2 from '../sec2/Sec2';

export default function MainWrap() {
	const location = useLocation();

	return (
		<div className='MainWrap'>
			<Visual />
			{/* <Btns /> */}
			<Sec1 />
			<Sec2 />
		</div>
	);
}
