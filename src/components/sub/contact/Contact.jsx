import { useEffect, useRef, useState } from 'react';
import Layout from '../../common/layout/Layout';
import emailjs from '@emailjs/browser';
import './Contact.scss';
import Form from './components/Form';

export default function Contact() {
	const mapElementForGenerate = useRef(null); // 지도생성시 필요한 요소
	const mapInstance = useRef(null); // mapInstance
	const marker = useRef(null); // marker
	const mapTypeController = useRef(null);
	const zoomController = useRef(null);

	const kakao = useRef(window.kakao.maps);
	console.log(kakao.current);

	const [MapInfo, setMapInfo] = useState([
		{
			active: true, // none
			title: 'kakao', // title
			center: new kakao.current.LatLng(37.55637, 126.92392393) // latlng
			// marker imgSrc
			// marker imgSize
		},
		{
			active: false,
			title: 'naver',
			center: new kakao.current.LatLng(37.3589, 127.1052131)
		},
		{
			active: false,
			title: 'seoul',
			center: new kakao.current.LatLng(37.5567, 126.97597)
		}
	]);

	const changeMap = (e, idx) => {
		setMapInfo(
			MapInfo.map((info, idx) => {
				if (e.target.innerText === info.title) {
					info.active = true;
				} else info.active = false;
				return info;
			})
		);
	};

	/* 
		rendering 된 이후 active 된 것 state 에서 state 를 반복하면서 active post 찾기
	*/
	const getCenterPosition = () => {
		const info = MapInfo.filter((el, idx) => el.active === true);
		return info[0].center;
	};

	// kakao api 는 속성의 key 가 center 가 아니면 에러남
	const mapOption = useRef({
		center: new kakao.current.LatLng(37.55637, 126.92392393),
		level: 3
	});

	// useEffect 는 렌더링된 이후에 생성된 것으로 ref 까지 이뤄진 상태이다.
	useEffect(() => {
		mapOption.current.center = getCenterPosition();
		mapInstance.current = new kakao.current.Map(
			mapElementForGenerate.current,
			mapOption.current
		);
		marker.current = new kakao.current.Marker({
			position: mapOption.current.center
		});
		marker.current.setMap(mapInstance.current);
		mapInstance.current.setZoomable(false);
		mapTypeController.current = new kakao.current.MapTypeControl();
		mapInstance.current.addControl(
			mapTypeController.current,
			kakao.current.ControlPosition.TOPRIGHT
		);
		zoomController.current = new kakao.current.ZoomControl();
		mapInstance.current.addControl(
			zoomController.current,
			kakao.current.ControlPosition.RIGHT
		);
	}, [MapInfo]);

	return (
		<Layout title={''} className={'Contact'}>
			{MapInfo.map((info, idx) => {
				if (info.active) {
					return (
						<div key={info + idx}>
							<header>
								<article
									className='mapBox'
									ref={mapElementForGenerate}></article>
							</header>
							<div className='map-list'>
								<div className='kakao map'>
									<button onClick={e => changeMap(e)}>kakao</button>
									<div className='info'>
										<span className='address'>
											Address: 162 Yanghwa-ro, Mapo-gu, Seoul
										</span>
										<span className='number'>Phone: 02-6010-0104</span>
										<span className='email'>Email: dkanvk1@gmail.com</span>
									</div>
								</div>
								<div className='naver map'>
									<button onClick={e => changeMap(e)}>naver</button>
									<div className='info'>
										<span className='address'>
											Address: 6 Buljeong-ro, Bundang-gu, Seongnam-si,
											Gyeonggi-do
										</span>
										<span className='number'>Phone: 1588-3830</span>
										<span className='email'>Email: dkanvk1@naver.com</span>
									</div>
								</div>
								<div className='seoul map'>
									<button onClick={e => changeMap(e)}>seoul</button>
									<div className='info'>
										<span className='address'>
											Address: 267 Namdaemunno 5(o)-ga, Jung-gu, Seoul
										</span>
										<span className='number'>Phone: 02-3709-0019</span>
										<span className='email'>Email: dkanvk1@gmail.com</span>
									</div>
								</div>
							</div>

							<div className='mail-title'>
								<h2>SEND US MESSAGE</h2>
								<span>Lorem ipsum dolor sit amet.</span>
							</div>
							<Form className='Form' />
						</div>
					);
				} else {
					return null;
				}
			})}
		</Layout>
	);
}

// dom 요소를 만들고 kakao 에서 제공한 함수에 요소를 인자로 전달한다.\
// mapInfo center 를 보다 정밀하게 아는 방법

// 정보가 제어하는 범위가 어디인가 ?
// state 의 제어범위와 컴포넌트가 화면을 표현하는 범위가 달라서 Form 태그로 분리함

/* setState 알고리즘

1. 클릭하면 event 가 전송됨
2. 

*/
