import { useEffect, useRef, useState, useCallback } from 'react';
import { useThrottle } from '../../../hooks/useThrottle';
import Layout from '../../common/layout/Layout';
import Form from './components/form/Form';
import './Contact.scss';
import ControlBox from './components/controlBox/ControlBox';
import GetTouchSection from './components/getTouchSection/GetTouchSection';
import Maps from './components/maps/Maps';

//  roadview 빼기
export default function Contact() {
	const path = process.env.PUBLIC_URL;
	const kakao = useRef(window.kakao);
	const [Index, setIndex] = useState(0);
	const [View, setView] = useState(false);

	const mapFrame = useRef(null); // default map
	const marker = useRef(null);
	const mapInstance = useRef(null);

	//지점마다 출력할 정보를 개별적인 객체로 묶어서 배열로 그룹화
	const mapInfo = useRef([
		{
			title: 'seoul',
			latlng: new kakao.current.maps.LatLng(37.5567, 126.97597),
			imgSrc: `${process.env.PUBLIC_URL}/img/marker/marker1.png`,
			imgSize: new kakao.current.maps.Size(232, 99),
			imgPos: { offset: new kakao.current.maps.Point(116, 99) }
		},
		{
			title: 'naver',
			latlng: new kakao.current.maps.LatLng(37.3589, 127.1052131),
			imgSrc: `${process.env.PUBLIC_URL}/img/marker/marker2.png`,
			imgSize: new kakao.current.maps.Size(232, 99),
			imgPos: { offset: new kakao.current.maps.Point(116, 99) }
		},
		{
			title: 'kakao',
			latlng: new kakao.current.maps.LatLng(37.55637, 126.92392393),
			imgSrc: `${process.env.PUBLIC_URL}/img/marker/marker3.png`,
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

	//컴포넌트 마운트시 참조객체에 담아놓은 돔 프레임에 지도 인스턴스 출력 및 마커 세팅
	useEffect(() => {
		mapFrame.current.innerHTML = '';
		mapInstance.current = new kakao.current.maps.Map(mapFrame.current, {
			center: mapInfo.current[Index].latlng,
			level: 3
		});
		marker.current.setMap(mapInstance.current);

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

	const setCenter = useCallback(() => {
		console.log('Throttling 적용후 setCenter');
		mapInstance.current.setCenter(mapInfo.current[Index].latlng);
	}, [Index]);

	const throttledSetCenter = useThrottle(setCenter);

	useEffect(() => {
		window.addEventListener('resize', throttledSetCenter);
		return () => window.removeEventListener('resize', throttledSetCenter);
	}, [throttledSetCenter]);

	return (
		<Layout
			title={'Contact us'}
			className='Contact'
			src={`${path}/movies/movie5.jpg`}>
			<GetTouchSection />

			<div className='contactWrap'>
				<div id='mailSection'>
					<div className='mailTitle'>
						<h2>Drop Us A Line</h2>
						<p>Whether you have a question about features,</p>
						<p>trials, pricing, need a demo, or anything else, our</p>
						<p>team is ready to answer.</p>
					</div>
					<Form />
				</div>

				<div id='mapSection'>
					<Maps mapFrame={mapFrame} View={View} />
					<ControlBox
						mapInfo={mapInfo}
						Index={Index}
						setIndex={setIndex}
						View={View}
						setView={setView}
						setCenter={setCenter}
					/>
				</div>
			</div>
		</Layout>
	);
}
