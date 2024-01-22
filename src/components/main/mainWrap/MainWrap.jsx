import Visual from '../visual/Visual';
import './MainWrap.scss';
import Sec1 from '../sec1/Sec1';
import Sec2 from '../sec2/Sec2';
import { useScroll } from '../../../hooks/useScroll';
import { useEffect } from 'react';

export default function MainWrap() {
	const { scrollTo } = useScroll();

	useEffect(() => {
		scrollTo(0);
	}, [scrollTo]);

	return (
		<div className='MainWrap'>
			<Visual />
			{/* <Btns /> */}
			<Sec1 />
			<Sec2 />
		</div>
	);
}

// sec1 의 offsetTop 을 알면 new Anime 를 통해 이동할 수 있음
