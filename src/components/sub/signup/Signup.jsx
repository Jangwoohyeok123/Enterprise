import { FaFacebookF, FaTwitter, FaYoutube, FaGoogle, FaSpotify } from 'react-icons/fa';
import { FcGoogle } from 'react-icons/fc';
import { RiKakaoTalkFill } from 'react-icons/ri';
import './Signup.scss';

export default function Signup() {
	return (
		<section className='Signup'>
			<fieldset>
				<legend className='hide'>signup page</legend>
				<h1>Registration</h1>
				<form>
					<section className='text-input'>
						<div className='text-input-1 input'>
							<label htmlFor='fullname'>Full Name</label>
							<input type='text' id='fullname' placeholder='Enter your name' />
						</div>

						<div className='text-input-2 input'>
							<label htmlFor='name'>User Name</label>
							<input type='text' id='name' placeholder='Enter your Username' />
						</div>

						<div className='text-input-3 input'>
							<label htmlFor='email'>Email</label>
							<input type='text' id='email' placeholder='Enter your email' />
						</div>

						<div className='text-input-4 input'>
							<label htmlFor='phone-number'>Phone Number</label>
							<input type='text' id='phonenumber' placeholder='Enter your number' />
						</div>

						<div className='text-input-5 input'>
							<label htmlFor='password'>Password</label>
							<input type='password' id='password' placeholder='Enter new password' />
						</div>

						<div className='text-input-6 input'>
							<label htmlFor='confirm-password'>Confirm password</label>
							<input type='password' id='confirm-password' placeholder='Enter confirm password' />
						</div>
					</section>
					<section className='else-input'>
						<h3>Sign-up Reason</h3>
						<div className='checkboxs'>
							<div className='checkbox'>
								<input type='checkbox' name='interest' id='Marketing' />
								<label htmlFor='Marketing'>Marketing</label>
							</div>
							<div className='checkbox'>
								<input type='checkbox' name='interest' id='Market Trends' />
								<label htmlFor='Market Trends'>Market Trends</label>
							</div>
							<div className='checkbox'>
								<input type='checkbox' name='interest' id='Collaboration' />
								<label htmlFor='Collaboration'>Collaboration</label>
							</div>
							<div className='checkbox'>
								<input type='checkbox' name='interest' id='Sponsorship' />
								<label htmlFor='Sponsorship'>Sponsorship</label>
							</div>
						</div>
					</section>
					<input type='submit' value='Register' />
				</form>

				<div className='sns'>
					<div className='google'>
						<FcGoogle />
					</div>
					<div className='kakao'>
						<RiKakaoTalkFill />
					</div>
				</div>
			</fieldset>
		</section>
	);
}
