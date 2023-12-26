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

	const [MapInfo, setMapInfo] = useState([
		{
			active: true,
			title: 'kakao',
			center: new window.kakao.maps.LatLng(37.55637, 126.92392393)
		},
		{
			active: false,
			title: 'naver',
			center: new window.kakao.maps.LatLng(37.3589, 127.1052131)
		},
		{
			active: false,
			title: 'seoul',
			center: new window.kakao.maps.LatLng(37.5567, 126.97597)
		}
	]);

	// 여기기기기기기기기!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
	const changeMap = e => {
		setMapInfo(
			// 클릭할때마다 MapInfo state 배열을 돌면서 하나의 info 를 활성화시킨다.
			MapInfo.map((info, idx) => {
				// 요소를 클릭 했을떄 요소를 활성화 시킨다.
				// 클릭한 요소를 mapInstance.current 와 marker.current 에 저장한다.
				// 즉, state 를 변경시킬때마다 useRef 의 값을 변경시킨다.
				if (e.target.innerText === info.title) {
					info.active = true;
				} else info.active = false;

				return info;
			})
		);
	};

	// rendering 된 이후 active 된 것 state 에서
	const 위치찾기 = () => {
		// state 를 회문하면서 active 찾기
		const info = MapInfo.filter((el, idx) => el.active === true);
		// marker.current = new window.kakao.maps.Marker({ position: mapInfoForInstance.current['kakao'].center });
		return info.center;
	};

	// kakao api 는 속성의 key 가 center 가 아니면 에러남
	const mapOption = useRef({
		center: new window.kakao.maps.LatLng(37.55637, 126.92392393),
		level: 3
	});

	// useEffect 는 렌더링된 이후에 생성된 것으로 ref 까지 이뤄진 상태이다.
	useEffect(() => {
		mapOption.current.center = 위치찾기();
		mapInstance.current = new window.kakao.maps.Map(mapElement.current, mapOption.current);
		marker.current = new window.kakao.maps.Marker({ position: mapOption.current.center });
		marker.current.setMap(mapInstance.current);
		// // 마커
		// marker.current = new window.kakao.maps.Marker({ position: mapInfoForInstance.current['kakao'].center });
		// marker.current.setMap(mapInstance.current);
		// marker 에게 필요한 정보는 position 이다. map 함수에서 active 된 position 을 전달하는 것이다.
		// Dom 에서 map 함수가 진행되면서 active 된 state 의 index 를 useEffect 에게 정보를 전달할 방법이 있는가 ?
		//
	}, [MapInfo]);
	// click 할때마다 marker 함수와 mapOption 을 바꿔줘야함
	// state 가 변경되면, map 과 marker, active 가 변경돼야함
	// active 상태의 요소를 이용해 화면을 구성한다.
	// active 라면 dom 이 만들어져야 한다. 그리고 map 과 marker 가 생성(변경x)돼야 한다. 이는 useEffect 가 필요하다는 의미다.
	// 생성될 때 필요한 것은 new 를 해야 하는데 mapInstance, mapElement 에 덮어씌우기를 해야함 이럴거면 스테이트를?..
	// 덮어씌우기를 map 함수의 active 상태에서 해야하는가 useEffect 에서 해야하는가 ?
	// 1. active 에서 해보자 => 못함 mapElement 를 mapInstance 에 전달해야 하는데 생성되기 전에 전달해야하는 문제가 발생함 즉, 순서문제
	// marker 가 index 를 전달받을 방법이 없다면 스스로 찾는 방법은 없는가 ?
	// useEffect 는 렌더링 된 이후이기 때문에 state 를 찾아보면 active 가 된 요소를 찾을 수 있다. 거기다 요소의 개수가 적기 때문에 filter 를 통해 찾는게 문제가 되지 않을 것 같다.

	return (
		<Layout title={''} className={'Contact'}>
			{MapInfo.map((info, idx) => {
				if (info.active) {
					return (
						<div key={info + idx}>
							<header>
								<article className='mapBox' ref={mapElement}></article>
							</header>

							<div className='map-list'>
								<div className='kakao map'>
									<button onClick={e => changeMap(e)}>kakao</button>
									<div className='info'>
										<span className='address'>Address: 162 Yanghwa-ro, Mapo-gu, Seoul</span>
										<span className='number'>Phone: 02-6010-0104</span>
										<span className='email'>Email: dkanvk1@gmail.com</span>
									</div>
								</div>
								<div className='naver map'>
									<button onClick={e => changeMap(e)}>naver</button>
									<div className='info'>
										<span className='address'>Address: 6 Buljeong-ro, Bundang-gu, Seongnam-si, Gyeonggi-do</span>
										<span className='number'>Phone: 1588-3830</span>
										<span className='email'>Email: dkanvk1@naver.com</span>
									</div>
								</div>
								<div className='seoul map'>
									<button onClick={e => changeMap(e)}>seoul</button>
									<div className='info'>
										<span className='address'>Address: 267 Namdaemunno 5(o)-ga, Jung-gu, Seoul</span>
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
