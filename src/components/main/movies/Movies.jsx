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
import { useQueryMain } from '../../../query/useQueryMain';

export default function Movies() {
	const { data, isSuccess } = useQueryMain();
	const path = useRef(process.env.PUBLIC_URL);
	const movies = useRef(null);
	const video = useRef(null);

	useEffect(() => {
		video.current.playbackRate = 0.9;
	}, []);

	if (isSuccess) {
		const movies = data.movies;

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
					{movies.map((movie, idx) => {
						return (
							<SwiperSlide key={idx}>
								<div className='mainCard'>
									<div className='wrap'>
										<img
											src={`${path.current}/movies/movie${idx + 1}.jpg`}
											alt='subPage'
										/>
										<div className='text'>
											<div className='title'>{movie.title}</div>
											<div className='desc'>{movie.desc}</div>

											<Link to={`/${movie.link}`}>
												<button>Go to page</button>
											</Link>
										</div>
									</div>
								</div>
							</SwiperSlide>
						);
					})}
				</Swiper>
			</div>
		);
	} else {
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
				</Swiper>
			</div>
		);
	}
}
