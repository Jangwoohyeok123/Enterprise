import { memo, useRef } from 'react';
import emailjs from '@emailjs/browser';
import './Form.scss';

function Form({ className }) {
	const form = useRef();
	const path = useRef(process.env.PUBLIC_URL);
	const sendEmail = e => {
		e.preventDefault();
		window.confirm('Do you want to send email?');

		emailjs
			.sendForm(
				'service_vj48mbo',
				'template_j2mozwh',
				form.current,
				'x-s69WH3OOeOCRhr0'
			)
			.then(
				result => {
					console.log(result.text);
				},
				error => {
					console.log(error.text);
				}
			);
	};

	return (
		// component 분리하면 [ 대문자 시작 + 태그 이름 ] 의 class
		<form
			ref={form}
			onSubmit={sendEmail}
			className={className}>
			<div className='profile'>
				<div className='address'>
					<label htmlFor='email_address'>
						Email Address
					</label>
					<input
						type='text'
						id='email_address'
						name='to_email'
						defaultValue=''
						placeholder='organizer@gmail.com'
					/>
				</div>
				<div className='name'>
					<label htmlFor='name'>Name</label>
					<input
						type='text'
						id='name'
						name='user_name'
						placeholder='name'
					/>
				</div>
			</div>
			<div className='message'>
				<label htmlFor='message'>Message</label>
				<textarea
					name='message'
					id='message'
					placeholder='Dear Lorem&#39;s employee'
				/>
			</div>
			<div className='submit'>
				<input type='submit' value='Send' />
			</div>
		</form>
	);
}

export default memo(Form);
