import './Visual.scss';
import { Swiper, SwiperSlide } from 'swiper/react';
// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

import { Pagination, Navigation } from 'swiper';
import { useQueryYoutube } from '../../../query/useQueryYoutube';
import { useEffect } from 'react';

export default function Visual() {
	const { isSuccess, data } = useQueryYoutube();
	const swiperOpt = {
		speed: 400,
		autoplay: true,
		modules: [Navigation, Pagination],
		loop: true,
		slidesPerView: 3,
		navigation: { clickable: true }
		// pagination: { clickable: true }
	};

	useEffect(() => {}, []);
	// modules={[Navigation, Pagination]} slidesPerView={3}

	return (
		<figure className='Visual myScroll'>
			<Swiper {...swiperOpt}>
				{isSuccess &&
					data.map((el, idx) => {
						if (idx >= 5) return null;
						return (
							<SwiperSlide key={el.id}>
								<div className='pic'>
									<p>
										<img
											src={el.snippet.thumbnails.standard.url}
											alt={el.snippet.title}
										/>
									</p>
									<p>
										<img
											src={el.snippet.thumbnails.standard.url}
											alt={el.snippet.title}
										/>
									</p>
								</div>
							</SwiperSlide>
						);
					})}
			</Swiper>
		</figure>
	);
}
