import './Visual.scss';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import { Autoplay } from 'swiper';
import { useRef, useState } from 'react';
import { useQueryYoutube } from '../../../query/useQueryYoutube';
import { useEffect } from 'react';

export default function Visual() {
	const { isSuccess, data } = useQueryYoutube();
	const path = useRef(process.env.PUBLIC_URL);
	const arr = useRef([
		'Best Performance',
		'Lorem Current',
		'Road Racer',
		'Hello Editor',
		"What's new",
		'Lorem ipsum',
		'Go away',
		'Animal Hanlder'
	]);

	const trimTitle = title => {
		let resultTit = '';
		if (title.includes('(')) resultTit = title.split('(')[0];
		else if (title.includes('[')) resultTit = title.split('[')[0];
		else resultTit = title;
		return resultTit;
	};

	return (
		<figure className='Visual myScroll'>
			<video
				src={`${path.current}/img/main/mainVideo.mp4`}
				loop
				autoPlay
				muted></video>
			<section id='circle'>
				{isSuccess &&
					data.map((el, idx) => {
						return (
							<article className={`face${idx + 1}`}>
								<h1>{arr.current[idx]}</h1>
								<div className='inner'>
									<div className='imgBox'>
										<img
											src={el.snippet.thumbnails.standard.url}
											alt={el.snippet.title}
										/>
									</div>
								</div>
							</article>
						);
					})}
			</section>
		</figure>
	);
}
