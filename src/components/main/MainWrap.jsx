import './MainWrap.scss';
import Visual from './visual/Visual';
import Pics from './pics/Pics';
// import Info from '../info/Info';

export default function MainWrap() {
	return (
		<div className='MainWrap'>
			<Visual></Visual>
			<Pics></Pics>
			{/* <Info></Info> */}
		</div>
	);
}
