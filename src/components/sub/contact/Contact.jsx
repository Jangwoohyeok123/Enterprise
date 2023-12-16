import { useEffect, useRef, useState } from 'react';
import Layout from '../../common/layout/Layout';
import emailjs from '@emailjs/browser';
import './Contact.scss';

export default function Contact() {
	const kakaoMap = useRef(null);
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

	const mapOption = useRef({
		center: new window.kakao.maps.LatLng(41.40428934983344, 2.1761382161266485),
		level: 3
	});

	useEffect(() => {
		// dom 을 만든 뒤 kakao 객체의 Map 함수를 dom 을 전달하며 호출한다.
		new window.kakao.maps.Map(kakaoMap.current, mapOption.current);
	}, []);

	return (
		<Layout title={'Contact Us'} className={'Contact'}>
			<header>
				<h3 style={{ fontSize: '1.5rem' }}>
					Lorem ipsum dolor sit amet consectetur adipisicing elit.
					<br /> Atque nobis hic voluptatibus distinctio!
				</h3>
				<article className='mapBox' ref={kakaoMap}></article>
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
						<span>삼성동</span>
						<span>코엑스</span>
						<span>엑슨모빌</span>
					</div>
				</div>

				<form ref={form} onSubmit={sendEmail}>
					<div className='profile'>
						<label for='email_address'>Email Address</label>
						<input
							type='text'
							id='email_address'
							name='to_email'
							defaultValue='dkanvk1@gmail.com'
							placeholder='organizer@gmail.com'
						/>
						<label for='name'>Name</label>
						<input type='text' id='name' name='user_name' placeholder='name' />
					</div>
					<div className='message'>
						<label for='message'>Message</label>
						<textarea name='message' id='message' placeholder='Dear Lorem&#39;s employee' />
					</div>
					<input className='submit' type='submit' value='Send' />
				</form>
			</section>
		</Layout>
	);
}

// dom 요소를 만들고 kakao 에서 제공한 함수에 요소를 인자로 전달한다.
