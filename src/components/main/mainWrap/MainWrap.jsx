// import Info from '../info/Info';
import Visual from '../visual/Visual';
import Pics from '../pics/Pics';
import Banner from '../banner/Banner';
import './MainWrap.scss';
import Btns from '../btns/Btns';
import { useRef } from 'react';

export default function MainWrap() {
	const refBtns = useRef(null);

	return (
		<div className='MainWrap'>
			<Visual />
			{/* <Info /> */}
			<Pics />
			<Banner />
			<Btns />
		</div>
	);
}
