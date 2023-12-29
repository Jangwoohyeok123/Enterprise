import './Btns.scss';
import 'swiper/css';
import 'swiper/css/pagination';
import { useSwiper } from 'swiper/react';
import { useEffect } from 'react';

function Btns({ btnDetail }) {
	const swiper = useSwiper(); //

	useEffect(() => {
		swiper.init(0);

		btnDetail?.addEventListenr('mouseenter', () => {});
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
