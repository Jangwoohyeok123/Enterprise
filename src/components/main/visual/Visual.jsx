import './Visual.scss';
import 'swiper/css';
import 'swiper/css/pagination';
import { Swiper, SwiperSlide, useSwiper } from 'swiper/react';
import { Pagination, Autoplay } from 'swiper';
import { useSelector } from 'react-redux';
import { useEffect } from 'react';
import useTextMethod from '../../../hooks/useText';
import { Link } from 'react-router-dom/cjs/react-router-dom.min';

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

export default function Visual() {
	const youtube = useSelector(store => store.youtubeReducer.youtube.items);
	const shortenText = useTextMethod('shorten');

	return (
		<figure className='Visual'>
			{youtube && (
				<Swiper
					speed={800}
					modules={[Pagination, Autoplay]}
					pagination={{
						clickable: true,
						renderBullet: (index, className) => {
							return `<span class=${className}>${index + 1}</span>`;
						}
					}}
					autoplay={{
						delay: 5000,
						disableOnInteraction: true // true 면 사용자가 클릭할 때 롤링 멈침
					}}
					initialSlide={0}
					loop={true}>
					{youtube?.map((vid, idx) => {
						if (idx >= 5) return null;
						return (
							<SwiperSlide key={vid.id}>
								{/* 외부 api 를 사용하려고 할 때는 따로 div 주자 */}
								{/* 첫 렌더링시 1부터 시작하지 않고 4부터 시작함 */}
								<div className='inner'>
									<div className='picBox'>
										<img src={vid.snippet.thumbnails.standard.url} alt={vid.snippet.title} />
										<img src={vid.snippet.thumbnails.standard.url} alt={vid.snippet.title} />
									</div>
									<div className='txtBox'>
										<h2>{shortenText(vid.snippet.title, 50)}</h2>
										<Link to={`/detail/${vid.id}`}>View Detail</Link>
									</div>
								</div>
							</SwiperSlide>
						);
					})}
					<Btns />
				</Swiper>
			)}
		</figure>
	);
}

/* 
	React Swiper 코어기능을 적용하기 위해서는 useSwiper 라는 hook 호출을 하기 위해서는 컴포넌트를 만든 후 사용해야 함 

	Swiper 컴포넌트 안쪽에 swiper 객체의 메소드를 사용하기 위해서는 아래의 조건을 만족시켜야 함
	1. 컴포넌트를 만들고 Swiper 컴포넌트 안에서 사용한다.  
	2. 컴포넌트는 useSwiper 를 통해서 swiper 객체를 갖고온다.
	3. swiper 객체의 메소드를 사용한다. 

	=> swiper 객체를 사용하는 컴포넌트는 스타일일 지정할 때 z-index 를 다뤄야 한다.
*/
