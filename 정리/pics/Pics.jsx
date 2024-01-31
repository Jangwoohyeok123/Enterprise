import { useRef } from 'react';
import './Pics.scss';
import { useScroll } from '../../src/hooks/useScroll';

export default function Pics() {
	const tit = useRef(null);
	const tit2 = useRef(null);
	const tit3 = useRef(null);

	const handleScroll = modifiedScroll => {
		if (modifiedScroll >= 0) {
			tit.current.style.transform = `translateX(${modifiedScroll - 200}px)`;
			tit.current.style.opacity = 1 - modifiedScroll / 1000;
			tit2.current.style.transform = `translateX(-${modifiedScroll + 300}px)`;
			tit2.current.style.opacity = 1 - modifiedScroll / 700;
			tit3.current.style.transform = `translateX(${modifiedScroll}px)`;
			tit3.current.style.opacity = 1 - modifiedScroll / 2000;
		} else {
			// section 에서 스크롤이 벗어난 상황일 때
		}
	};

	// main page 의 Pics section 에 parallax 를 적용함
	const { refEl } = useScroll(handleScroll);

	return (
		<section className='Pics myScroll' ref={refEl}>
			<h3 className='tit' ref={tit}>
				LOREM
			</h3>
			<h4 className='tit2' ref={tit2}>
				STARTED
			</h4>
			<h5 className='tit3' ref={tit3}>
				HAPPY HACKING
			</h5>
		</section>
	);
}
