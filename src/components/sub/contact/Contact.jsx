import { useEffect, useRef, useState } from 'react';
import Layout from '../../common/layout/Layout';
import emailjs from '@emailjs/browser';
import './Contact.scss';

export default function Contact() {
	const mapElement = useRef(null);
	const mapInstance = useRef(null);
	const marker = useRef(null);
	// dom 생성후 api 를 호출할 때 필요한 option 을 설정할 때도 api 가 필요함

	const path = useRef(process.env.PUBLIC_URL);

	// emailJS
	const form = useRef();
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

	// naver, google, kakao 위치정보등을 담을 객체
	// latlng 는 'marker 객체의 Marker 함수의 인자로 전달할 값'
	// 배열보다는 객체가 인덱싱하기가 편함
	const mapInfoForInstance = useRef({
		naver: {
			title: 'naver',
			center: new window.kakao.maps.LatLng(37.3589, 127.1052131)
		},
		kakao: {
			title: 'kakako',
			center: new window.kakao.maps.LatLng(37.55637, 126.92392393)
		},
		seoul: {
			title: 'seoul',
			center: new window.kakao.maps.LatLng(37.5567, 126.97597)
		}
	});

	// kakao api 는 속성의 key 가 center 가 아니면 에러남
	const mapOption = useRef({
		center: new window.kakao.maps.LatLng(37.5567, 126.97597),
		level: 3
	});

	// 카카오 지도를 담을 html 요소와 카카오 지도 객체를 따로 저장하는 구조인가 ?
	// mapInstance, mapFrame
	/* 
		mapInstance 가 한일
			setCenter info 를 참조하여 setCenter 함
			new window.kakao.current.maps.Map(mapEl.current, mapOption); 의 결과값임
	*/

	// 1. markerPostion 생성 marker 가 들어갈 position은 mapOption center 다.
	// 2. marker 객체 생성 marker 객체를 기존에 등록한 kakao 객체의 Marker 함수를 통해 position 을 전달하면서 생성
	// 3. 지도에 마커 생성 marker 객체의 지도를 이용해 setMap 함수 호출하면서 지도에 marker 생성
	// const markerPosition = new kakao.maps.LatLng(33.40123, 244.123123);
	// const marker = new kakao.maps.Marker({position: markerPosition});
	// marker.setMap(map);
	// marker 객체는 지도를 인자로 받아서 setting 하는 함수를 호출한다.
	// marker 객체는 mapInstance.current 를 인자로 받아 setMap 을 호출한다.

	useEffect(() => {
		mapInstance.current = new window.kakao.maps.Map(mapElement.current, mapOption.current);
		marker.current = new window.kakao.maps.Marker({ position: mapInfoForInstance.current['seoul'].center });
		marker.current.setMap(mapInstance.current);
	}, []);

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

				<form ref={form} onSubmit={sendEmail}>
					<div className='profile'>
						<label htmlFor='email_address'>Email Address</label>
						<input
							type='text'
							id='email_address'
							name='to_email'
							defaultValue='dkanvk1@gmail.com'
							placeholder='organizer@gmail.com'
						/>
						<label htmlFor='name'>Name</label>
						<input type='text' id='name' name='user_name' placeholder='name' />
					</div>
					<div className='message'>
						<label htmlFor='message'>Message</label>
						<textarea name='message' id='message' placeholder='Dear Lorem&#39;s employee' />
					</div>
					<input className='submit' type='submit' value='Send' />
				</form>
			</section>
		</Layout>
	);
}

// dom 요소를 만들고 kakao 에서 제공한 함수에 요소를 인자로 전달한다.\
// mapInfo center 를 보다 정밀하게 아는 방법
