import { useEffect, useRef, useState, useCallback } from 'react';
import { useThrottle } from '../../../hooks/useThrottle';
import Layout from '../../common/layout/Layout';
import Form from './components/Form';
import './Contact.scss';
import ControlBox from './components/ControlBox';

export default function Contact() {
	const path = process.env.PUBLIC_URL;
	const kakao = useRef(window.kakao);

	const [Index, setIndex] = useState(0);
	const [Traffic, setTraffic] = useState(false);
	const [View, setView] = useState(false);

	const mapFrame = useRef(null);
	const viewFrame = useRef(null);

	const marker = useRef(null);
	const mapInstance = useRef(null);

	//지점마다 출력할 정보를 개별적인 객체로 묶어서 배열로 그룹화
	const mapInfo = useRef([
		{
			title: 'seoul',
			latlng: new kakao.current.maps.LatLng(37.5567, 126.97597),
			imgSrc: `${process.env.PUBLIC_URL}/img/marker1.png`,
			imgSize: new kakao.current.maps.Size(232, 99),
			imgPos: { offset: new kakao.current.maps.Point(116, 99) }
		},
		{
			title: 'naver',
			latlng: new kakao.current.maps.LatLng(37.3589, 127.1052131),
			imgSrc: `${process.env.PUBLIC_URL}/img/marker2.png`,
			imgSize: new kakao.current.maps.Size(232, 99),
			imgPos: { offset: new kakao.current.maps.Point(116, 99) }
		},
		{
			title: 'kakao',
			latlng: new kakao.current.maps.LatLng(37.55637, 126.92392393),
			imgSrc: `${process.env.PUBLIC_URL}/img/marker3.png`,
			imgSize: new kakao.current.maps.Size(232, 99),
			imgPos: { offset: new kakao.current.maps.Point(116, 99) }
		}
	]);

	//마커 인스턴스 생성
	marker.current = new kakao.current.maps.Marker({
		position: mapInfo.current[Index].latlng,
		image: new kakao.current.maps.MarkerImage(
			mapInfo.current[Index].imgSrc,
			mapInfo.current[Index].imgSize,
			mapInfo.current[Index].imgOpt
		)
	});

	const roadview = useCallback(() => {
		console.log('roadview');
		new kakao.current.maps.RoadviewClient().getNearestPanoId(
			mapInfo.current[Index].latlng,
			50,
			panoId => {
				new kakao.current.maps.Roadview(viewFrame.current).setPanoId(
					panoId,
					mapInfo.current[Index].latlng
				);
			}
		);
	}, [Index]);

	const setCenter = useCallback(() => {
		console.log('setCenter');
		mapInstance.current.setCenter(mapInfo.current[Index].latlng);
	}, [Index]);

	const throttledSetCenter = useThrottle(setCenter);

	//컴포넌트 마운트시 참조객체에 담아놓은 돔 프레임에 지도 인스턴스 출력 및 마커 세팅
	useEffect(() => {
		mapFrame.current.innerHTML = '';
		viewFrame.current.innerHTML = '';
		mapInstance.current = new kakao.current.maps.Map(mapFrame.current, {
			center: mapInfo.current[Index].latlng,
			level: 3
		});
		marker.current.setMap(mapInstance.current);
		setTraffic(false);
		setView(false);

		mapInstance.current.addControl(
			new kakao.current.maps.MapTypeControl(),
			kakao.current.maps.ControlPosition.TOPRIGHT
		);
		mapInstance.current.addControl(
			new kakao.current.maps.ZoomControl(),
			kakao.current.maps.ControlPosition.RIGHT
		);
		mapInstance.current.setZoomable(false);
	}, [Index]);

	useEffect(() => {
		window.addEventListener('resize', throttledSetCenter);
		return () => window.removeEventListener('resize', throttledSetCenter);
	}, [throttledSetCenter]);

	useEffect(() => {
		View && viewFrame.current.children.length === 0 && roadview();
	}, [View, roadview]);

	useEffect(() => {
		Traffic
			? mapInstance.current.addOverlayMapTypeId(
					kakao.current.maps.MapTypeId.TRAFFIC
			  )
			: mapInstance.current.removeOverlayMapTypeId(
					kakao.current.maps.MapTypeId.TRAFFIC
			  );
	}, [Traffic]);

	return (
		<Layout
			title={'Contact us'}
			className='Contact'
			src={`${path}/img/temps/temp2.jpg`}>
			<div id='mailSection'>
				<Form />
			</div>

			<div id='mapSection'>
				<ControlBox
					mapInfo={mapInfo}
					Index={Index}
					setIndex={setIndex}
					Traffic={Traffic}
					setTraffic={setTraffic}
					View={View}
					setView={setView}
					setCenter={setCenter}
				/>

				<section className='tab'>
					<article
						className={`mapBox ${View ? '' : 'on'}`}
						ref={mapFrame}></article>
					<article
						className={`viewBox ${View ? 'on' : ''}`}
						ref={viewFrame}></article>
				</section>
			</div>
		</Layout>
	);
}
