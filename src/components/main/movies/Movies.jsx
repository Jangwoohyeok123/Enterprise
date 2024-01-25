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
						<div className='title'></div>
						<div className='desc'></div>
						<img src='' alt='' />
					</div>
				</SwiperSlide>
				{/* <SwiperSlide>
					<div className='mainCard'>
						<div className='title'>Slide 1</div>
						<div className='text'>
							<p>
								Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam
							</p>
						</div>
					</div>
				</SwiperSlide>
				<SwiperSlide>
					<div className='title' data-swiper-parallax='-300'>
						Slide 3
					</div>
					<div className='subtitle' data-swiper-parallax='-200'>
						Subtitle
					</div>
					<div className='text' data-swiper-parallax='-100'>
						<p>
							Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam
							dictum mattis velit, sit amet faucibus felis iaculis nec. Nulla
							laoreet justo vitae porttitor porttitor. Suspendisse in sem justo.
							Integer laoreet magna nec elit suscipit, ac laoreet nibh euismod.
							Aliquam hendrerit lorem at elit facilisis rutrum. Ut at
							ullamcorper velit. Nulla ligula nisi, imperdiet ut lacinia nec,
							tincidunt ut libero. Aenean feugiat non eros quis feugiat.
						</p>
					</div>
				</SwiperSlide> */}
			</Swiper>
		</div>
	);
}
