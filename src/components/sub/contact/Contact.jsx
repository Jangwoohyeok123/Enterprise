import { useEffect, useRef, useState } from 'react';
import Layout from '../../common/layout/Layout';
import './Contact.scss';

export default function Contact() {
	const [Title, setTitle] = useState('');
	const kakaoMap = useRef(null);
	// dom 생성후 api 를 호출할 때 필요한 option 을 설정할 때도 api 가 필요함

	const mapOption = useRef({
		center: new window.kakao.maps.LatLng(41.40428934983344, 2.1761382161266485),
		level: 3,
	});

	useEffect(() => {
		// dom 을 만든 뒤 kakao 객체의 Map 함수를 dom 을 전달하며 호출한다.
		new window.kakao.maps.Map(kakaoMap.current, mapOption.current);
	}, []);

	return (
		<Layout Title={Title}>
			<article className='mapBox' ref={kakaoMap}></article>
		</Layout>
	);
}

// dom 요소를 만들고 kakao 에서 제공한 함수에 요소를 인자로 전달한다.
