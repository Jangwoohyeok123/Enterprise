import './Btns.scss';
import 'swiper/css';
import 'swiper/css/pagination';
import { useSwiper } from 'swiper/react';
import { useEffect } from 'react';

/* 
  swiperRef 라는 참조객체를 부모요소와 자식요소가 공유하고 자식요소에서 swiperRef 를 만든다. 이후 부모요소에서도, 자식요소에서도 공유되는 참조객체를 통해서 swiper 객체를 사용할 수 있다.
*/

function Btns({ swiperRef }) {
	swiperRef.current = useSwiper();
	const swiper = swiperRef.current;

	useEffect(() => {
		swiper.init(0);
	}, [swiper]);

	return (
		<nav className='swiperController'>
			<button
				onClick={() => {
					/* 
						prev button 을 클릭할 경우 이전으로 넘어감과 동시에 autoplay 가 실행된다. 
					*/
					swiper.slidePrev(1000, true);
					swiper.autoplay.start();
				}}>
				prev
			</button>
			<button
				onClick={() => {
					/* 
						start button 을 클릭할 경우 다음으로 바로 넘어가고 동시에 autoPlay 됨 
					*/
					swiper.slideNext(1000, true);
					swiper.autoplay.start();
				}}>
				next
			</button>
			<button onClick={() => swiper.autoplay.stop()}>stop</button>
		</nav>
	);
}

export default Btns;
