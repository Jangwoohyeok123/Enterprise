// import Info from '../info/Info';
import Visual from '../visual/Visual';
import Pics from '../pics/Pics';
import Banner from '../banner/Banner';
import './MainWrap.scss';
import Btns from '../btns/Btns';
import { useRef } from 'react';
import { useLocation } from 'react-router-dom/cjs/react-router-dom.min';

export default function MainWrap() {
	const location = useLocation();
	console.log(location.pathname);

	return (
		<div className='MainWrap'>
			<Visual />
			<Pics />
			<Banner />
			<Btns />
		</div>
	);
}
