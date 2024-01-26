import React, { useEffect, useRef, useState } from 'react';
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';
// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import './Movies.scss';

// import required modules
import { Parallax, Pagination, Navigation } from 'swiper/modules';
import { Link } from 'react-router-dom/cjs/react-router-dom.min';

export default function Movies() {
	const path = useRef(process.env.PUBLIC_URL);
	const video = useRef(null);

	useEffect(() => {
		video.current.playbackRate = 1;
	}, []);

	return (
		<div className='Movies'>
			<Swiper
				style={{
					'--swiper-navigation-color': 'var(--subPoint)',
					'--swiper-pagination-color': 'var(--subPoint)'
				}}
				speed={500}
				pagination={{
					clickable: true
				}}
				navigation={true}
				modules={[Parallax, Pagination, Navigation]}
				className='swiper'>
				<video
					ref={video}
					src={`${path.current}/movies/movie.mp4`}
					autoPlay
					loop
					muted
					slot='container-start'
					className='parallax-bg'
					data-swiper-parallax='0%'></video>
				<SwiperSlide>
					<div className='mainCard'>
						<div className='wrap'>
							<img src={`${path.current}/movies/movie1.jpg`} alt='subPage' />
							<div className='text'>
								<div className='title'>DEPARTMENT</div>
								<div className='desc'>
									Our department, renowned for excellence in both teaching and
									research, offers a dynamic and innovative educational
									experience. We boast a diverse range of programs, encompassing
								</div>

								<Link to='/department'>
									<button>Go to page</button>
								</Link>
							</div>
						</div>
					</div>
				</SwiperSlide>
			</Swiper>
		</div>
	);
}
