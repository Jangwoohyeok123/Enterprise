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
	const num = useRef(4); // 루프될 사진개수
	const swipeRef = useRef(null);
	const { isSuccess, data } = useQueryYoutube();
	const [PrevIndex, setPrevIndex] = useState(0);
	const [NextIndex, setNextIndex] = useState(0);
	const [Index, setIndex] = useState(0);
	const test = useRef(null);

	// 정리 > txt정리 > visual.md 의 설명을 참조할 것
	const swiperOpt = useRef({
		modules: [Autoplay],
		loop: true,
		autoplay: { delay: 2000, disableOnInteraction: true },
		slidesPerView: 2,
		spaceBetween: 50,
		centeredSlides: true,
		loopedSlides: num.current,
		onSwiper: swiper => {
			swipeRef.current = swiper;
		},
		onSlideChange: swiper => {
			setIndex(swiper.realIndex);
			swiper.realIndex === 0
				? setPrevIndex(num.current - 1)
				: setPrevIndex(swiper.realIndex - 1);
			swiper.realIndex === num.current - 1
				? setNextIndex(0)
				: setNextIndex(swiper.realIndex + 1);
		},
		breakpoints: {
			1050: { slidesPerView: 2 },
			1400: { slidesPerView: 3 }
		}
	});

	const trimTitle = title => {
		let resultTit = '';
		if (title.includes('(')) resultTit = title.split('(')[0];
		else if (title.includes('[')) resultTit = title.split('[')[0];
		else resultTit = title;
		return resultTit;
	};

	useEffect(() => {}, []);

	return (
		<figure className='Visual myScroll'>
			<div className='txtBox'>
				<ul>
					{isSuccess &&
						data.map((el, idx) => {
							if (idx >= num.current) return null;

							return (
								<li key={el.id} className={idx === Index ? 'on' : ''}>
									<h3>{trimTitle(el.snippet.title)}</h3>
								</li>
							);
						})}
				</ul>
			</div>

			<Swiper {...swiperOpt.current}>
				{isSuccess &&
					data.map((el, idx) => {
						if (idx >= num.current) return null;
						return (
							/* 
								1. 두 개의 사진이 겹쳐보이게 css 처리한다.
								2. SwiperSlide 의 자식요소들은 하나의 slide 단위로 처리된다.
							*/
							<SwiperSlide key={el.id} ref={test}>
								<div className='pic'>
									<p>
										{/* blur */}
										<img
											src={el.snippet.thumbnails.standard.url}
											alt={el.snippet.title}
										/>
									</p>
									<p>
										{/* 보이는 이미지 */}
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

			<nav className='preview'>
				{isSuccess && (
					<>
						<p
							className='prevBox'
							onClick={() => swipeRef.current.slidePrev(400)}>
							<img
								src={data[PrevIndex].snippet.thumbnails.default.url}
								alt={data[PrevIndex].snippet.title}
							/>
						</p>
						<p
							className='nextBox'
							onClick={() => swipeRef.current.slideNext(400)}>
							<img
								src={data[NextIndex].snippet.thumbnails.default.url}
								alt={data[NextIndex].snippet.title}
							/>
						</p>
					</>
				)}
			</nav>

			<ul className='pagination'>
				{Array(num.current)
					.fill()
					.map((_, idx) => {
						return (
							<li
								key={idx}
								className={idx === Index ? 'on' : ''}
								onClick={() => swipeRef.current.slideToLoop(idx, 400)}></li>
						);
					})}
			</ul>

			<div className='barFrame'>
				<p
					className='bar'
					style={{ width: (100 / num.current) * (Index + 1) + '%' }}></p>
			</div>

			<div className='counter'>
				<strong>0{Index + 1}</strong>/<span>0{num.current}</span>
			</div>
		</figure>
	);
}
