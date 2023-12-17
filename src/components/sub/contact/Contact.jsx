import { useEffect, useRef, useState } from 'react';
import Layout from '../../common/layout/Layout';
import emailjs from '@emailjs/browser';
import './Contact.scss';
import Form from './components/Form';

export default function Contact() {
	// kakao
	const mapElement = useRef(null);
	const mapInstance = useRef(null);
	const marker = useRef(null);

	// email
	const form = useRef();
	const path = useRef(process.env.PUBLIC_URL);
	const sendEmail = e => {
		e.preventDefault();

		emailjs.sendForm('service_vj48mbo', 'template_j2mozwh', form.current, 'x-s69WH3OOeOCRhr0').then(
			result => {
				console.log(result.text);
			},
			error => {
				console.log(error.text);
			}
		);
	};

	const [MapInfo, setMapInfo] = useState([
		{
			title: 'kakako',
			center: new window.kakao.maps.LatLng(37.55637, 126.92392393)
		},
		{
			title: 'naver',
			center: new window.kakao.maps.LatLng(37.3589, 127.1052131)
		},
		{
			title: 'seoul',
			center: new window.kakao.maps.LatLng(37.5567, 126.97597)
		}
	]);

	// kakao map

	/* 
			setKakao: () => {
						// click 할때마다 marker 함수와 mapInstance 에 적용되는 mapOption 을 바꿔줘야함
			mapInstance.current = new window.kakao.maps.Map(mapElement.current, mapInfoForInstance['kakao'].center);
			marker.current.setMap(mapInstance.current);
		},
	*/

	// kakao api 는 속성의 key 가 center 가 아니면 에러남
	const mapOption = useRef({
		center: new window.kakao.maps.LatLng(37.55637, 126.92392393),
		level: 3
	});

	useEffect(() => {
		mapInstance.current = new window.kakao.maps.Map(mapElement.current, mapOption.current);
		// // 마커
		// marker.current = new window.kakao.maps.Marker({ position: mapInfoForInstance.current['kakao'].center });
		// marker.current.setMap(mapInstance.current);
	}, []);
	// click 할때마다 marker 함수와 mapOption 을 바꿔줘야함

	return (
		<Layout title={'Contact Us'} className={'Contact'}>
			<header>
				<h3 style={{ fontSize: '1.5rem' }}>
					Lorem ipsum dolor sit amet consectetur adipisicing elit.
					<br /> Atque nobis hic voluptatibus distinctio!
				</h3>
				<article className='mapBox' ref={mapElement}></article>
			</header>

			<section className='info'>
				<div className='txt-info'>
					<div className='txt-info-header'>
						<span>LOCATION</span>
						<h2 style={{ fontSize: '2rem' }}>HOW TO FIND US</h2>
					</div>
					{/* {MapInfo} */}
					<div className='txt-info-body'>
						<span>
							<strong>Address</strong> = {'map요소'}
						</span>
						<span>
							<strong>Telephone</strong> = {'map요소'}
						</span>
						<span>
							<strong>Fax</strong> = {'map요소'}
						</span>
					</div>
					<div className='txt-info-footer'>
						{/* 초기에는 kakako 본사, naver 본사, google 본사 */}
						{/* 상자를 클릭하면 kakao 본사로 이동하기
							이동한다란? 
							1. kakao.Maps(카카오본사 위치)
							2. marker.setMap(지도) 
						*/}

						<span>kakao</span>
						<span>naver</span>
						<span>seoul</span>
					</div>
				</div>

				<Form />
			</section>
		</Layout>
	);
}

// dom 요소를 만들고 kakao 에서 제공한 함수에 요소를 인자로 전달한다.\
// mapInfo center 를 보다 정밀하게 아는 방법

// 정보가 제어하는 범위가 어디인가 ?
// state 의 제어범위와 컴포넌트가 화면을 표현하는 범위가 달라서 Form 태그로 분리함
