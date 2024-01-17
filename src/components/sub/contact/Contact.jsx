import { useEffect, useRef, useState } from 'react';
import Layout from '../../common/layout/Layout';
import emailjs from '@emailjs/browser';
import './Contact.scss';
import Form from './components/Form';
import useThrottle from '../../../hooks/useThrottle';

export default function Contact() {
	const mapFrame = useRef(null); // 지도생성시 필요한 요소
	const mapInstance = useRef(null); // mapInstance
	const marker = useRef(null); // marker
	const mapTypeController = useRef(null);
	const zoomController = useRef(null);
	const kakao = useRef(window.kakao.maps);

	// kakao api 는 속성의 key 가 center 가 아니면 에러남
	const mapOption = useRef({
		center: new kakao.current.LatLng(37.55637, 126.92392393),
		level: 3
	});

	const [MapInfo, setMapInfo] = useState([
		{
			active: true, // none
			title: 'kakao', // title
			center: new kakao.current.LatLng(37.55637, 126.92392393)
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

	const getCenterPosition = () => {
		const info = MapInfo.filter((el, idx) => el.active === true);
		return info[0].center;
	};

	const setCenter = () => {
		const activeIndex = MapInfo.findIndex(info => info.active);
		mapInstance.current.setCenter(MapInfo[activeIndex].center);
	};

	const throttledSetCenter = useThrottle(setCenter);

	// useEffect 는 렌더링된 이후에 생성된 것으로 ref 까지 이뤄진 상태이다.
	// tab 키를 통해서 Info 가 바뀔떄마다 새로운 객체 생성(기능생성)
	useEffect(() => {
		mapOption.current.center = getCenterPosition();
		mapInstance.current = new kakao.current.Map(
			mapFrame.current,
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

	useEffect(() => {
		window.addEventListener('resize', throttledSetCenter);

		return window.removeEventListener('resize', throttledSetCenter);
	}, []);

	return (
		<Layout title={''} className={'Contact'}>
			{MapInfo.map((info, idx) => {
				if (info.active) {
					return (
						<div key={info + idx}>
							<header>
								<article className='mapBox' ref={mapFrame}></article>
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
							<button onClick={setCenter}>중심으로 </button>
						</div>
					);
				} else {
					return null;
				}
			})}
		</Layout>
	);
}

// https://www.pinterest.co.kr/pin/688698968048455898/
