import { useRef } from 'react';
import './Pics.scss';
import { useScroll } from '../../../hooks/useScroll';

export default function Pics() {
	const tit = useRef(null);
	const tit2 = useRef(null);
	const tit3 = useRef(null);

	// const num = useRef(4); // 루프될 사진개수
	// const swipeRef = useRef(null);

	// const [PrevIndex, setPrevIndex] = useState(0);
	// const [NextIndex, setNextIndex] = useState(0);
	// const [Index, setIndex] = useState(0);
	// const test = useRef(null);

	// 정리 > txt정리 > visual.md 의 설명을 참조할 것
	// const swiperOpt = useRef({
	// 	modules: [Autoplay],
	// 	speed: 800,
	// 	loop: true,
	// 	autoplay: { delay: 4000, disableOnInteraction: true },
	// 	slidesPerView: 1,
	// 	spaceBetween: 50,
	// 	centeredSlides: true,
	// 	loopedSlides: num.current,
	// 	onSwiper: swiper => {
	// 		swipeRef.current = swiper;
	// 	},
	// 	onSlideChange: swiper => {
	// 		setIndex(swiper.realIndex);
	// 		swiper.realIndex === 0
	// 			? setPrevIndex(num.current - 1)
	// 			: setPrevIndex(swiper.realIndex - 1);
	// 		swiper.realIndex === num.current - 1
	// 			? setNextIndex(0)
	// 			: setNextIndex(swiper.realIndex + 1);
	// 	},
	// 	breakpoints: {
	// 		1050: { slidesPerView: 3 },
	// 		1400: { slidesPerView: 3 }
	// 	}
	// });
	/*
	  핸들러는 parallax 기능을 담고 있으며 useScroll 에 전달한다.
	  인자로 전달한 scroll 은 modifiedScroll 로 변환된다.
	  분모가 커질수록 변화가 작아진다.
	*/
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
