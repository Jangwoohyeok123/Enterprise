import './Visual.scss';
import { useRef } from 'react';
import { useSelector } from 'react-redux';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper';
import 'swiper/css';

export default function Visual() {
	const Vids = useSelector(store => store.youtubeReducer.youtube.items);

	const swiperOpt = useRef({
		modules: [Autoplay],
		autoplay: { delay: 5000, disableOnInteraction: true },
		loop: true,
		slidesPerView: 1,
		centeredSlides: true,
		breakpoints: {
			1050: { slidesPerView: 3 }
		},
		onSwiper: swiper => {
			swiper.slideNext(300);
		}
	});

	return (
		<figure className='Visual'>
			<Swiper {...swiperOpt.current}>
				{Vids &&
					Vids.map((data, idx) => {
						if (idx >= 5) return null;
						return (
							<SwiperSlide key={data.id}>
								<div className='inner'>
									<div className='picBox'>
										<img
											src={data.snippet.thumbnails.standard.url}
											alt={data.snippet.title}
										/>
									</div>
									<div className='txtBox'>
										<h2>{data.snippet.title}</h2>
									</div>
								</div>
							</SwiperSlide>
						);
					})}
			</Swiper>
		</figure>
	);
}

/* 
	Swiper 는 자체적으로 ui 구조를 변경시키기 때문에 script 또는 sass 를 통한 반응형처리 불가능 

	=> breakpoints 를 통해 브라우저 폭에따라 swiper option 값 변경가능
	=> 
*/
