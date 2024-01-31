import './MainWrap.scss';
import Sec1 from '../sec1/Sec1';
import Sec2 from '../sec2/Sec2';
import Movies from '../movies/Movies';
import { useTargetScroll } from '../../../hooks/useTargetScroll';

export default function MainWrap() {
	useTargetScroll();

	return (
		<div className='MainWrap'>
			<Movies />
			<Sec1 />
			<Sec2 />
		</div>
	);
}
