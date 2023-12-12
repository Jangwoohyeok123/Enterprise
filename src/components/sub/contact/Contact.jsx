import { useEffect, useRef, useState } from 'react';
import Layout from '../../common/layout/Layout';
import emailjs from '@emailjs/browser';
import './Contact.scss';

export default function Contact() {
	const [Title, setTitle] = useState('dasdzxhbck');
	const kakaoMap = useRef(null);
	// dom 생성후 api 를 호출할 때 필요한 option 을 설정할 때도 api 가 필요함

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

	const mapOption = useRef({
		center: new window.kakao.maps.LatLng(41.40428934983344, 2.1761382161266485),
		level: 3
	});

	useEffect(() => {
		// dom 을 만든 뒤 kakao 객체의 Map 함수를 dom 을 전달하며 호출한다.
		new window.kakao.maps.Map(kakaoMap.current, mapOption.current);
	}, []);

	return (
		<Layout title={Title}>
			<article className='mapBox' ref={kakaoMap}></article>
			<form ref={form} onSubmit={sendEmail}>
				<label>Name</label>
				<input type='text' name='user_name' />
				<label>Email</label>
				<input type='email' name='user_email' />
				<label>Message</label>
				<textarea name='message' />
				<input type='submit' value='Send' />
			</form>
		</Layout>
	);
}

// dom 요소를 만들고 kakao 에서 제공한 함수에 요소를 인자로 전달한다.
