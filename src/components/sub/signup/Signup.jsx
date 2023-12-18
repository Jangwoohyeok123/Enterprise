import { FaFacebookF, FaTwitter, FaYoutube, FaGoogle, FaSpotify } from 'react-icons/fa';
import { FcGoogle } from 'react-icons/fc';
import { RiKakaoTalkFill } from 'react-icons/ri';
import './Signup.scss';
import { useHistory } from 'react-router-dom';
import { useRef, useState } from 'react';
import { useDebounce } from '../../../hooks/useDebounce';

export default function Signup() {
	const history = useHistory();
	// reset 시 필요할 수 있기 때문에 useRef 처리한 후 state 할당
	const initVal = useRef({
		username: '',
		email: '',
		password1: '',
		password2: '',
		reasons: [] // input checkbox 들은 배열로 관리한다.
	});
	const [Val, setVal] = useState(initVal.current);
	console.log(Val);

	// const [Inputs, setInputs] = useDebounce(init.current, );
	// const DebouncedVal = useDebounce(Val);

	const handleChange = e => {
		// 입력할때마다 state 변경하기
		// const { name, value } = e.target;
		// setInputs({ ...Inputs, [name]: value });
		const { name, value } = e.target;
		setVal({ ...Val, [name]: value });
	};

	const handleCheck = e => {
		// 체크할때마다 state 변경하기
		const { name } = e.target;
		// e.target 의 부모요소를 가서 input 들 긁어오기
		const inputs = e.target.parentElement.querySelectorAll('input');
		const checkArr = []; // check 한 배열을 담을 그릇
		console.log(inputs);
		inputs.forEach(input => input.checked && checkArr.push(input.value));
		setVal({ ...Val, [name]: checkArr });
	};
	const handleSubmit = () => {
		// Register 버튼 클릭했을 때 처리하기
	};

	return (
		<section className='Signup'>
			<fieldset>
				<legend className='hide'>signup page</legend>
				<h1>Registration</h1>
				<form onSubmit={handleSubmit}>
					<section className='text-input'>
						<div className='text-input-1 input'>
							<label htmlFor='name'>User Name</label>
							<input type='text' id='name' placeholder='Enter your Username' onChange={handleChange} />
						</div>

						<div className='text-input-2 input'>
							<label htmlFor='email'>Email</label>
							<input type='text' id='email' placeholder='Enter your email' onChange={handleChange} />
						</div>

						<div className='text-input-3 input'>
							<label htmlFor='password'>Password</label>
							<input type='password' id='password' placeholder='Enter new password' onChange={handleChange} />
						</div>

						<div className='text-input-4 input'>
							<label htmlFor='confirm-password'>Confirm password</label>
							<input
								type='password'
								id='confirm-password'
								placeholder='Enter confirm password'
								onChange={handleChange}
							/>
						</div>
					</section>

					<section className='else-input'>
						<div className='reason'>
							<h3>Sign-up Reason</h3>
							<div className='checkboxs'>
								<input type='checkbox' name='reasons' value='marketing' id='Marketing' onChange={handleCheck} />
								<label htmlFor='Marketing'>Marketing</label>

								<input type='checkbox' name='reasons' value='trends' id='Market Trends' onChange={handleCheck} />
								<label htmlFor='Market Trends'>Market Trends</label>

								<input type='checkbox' name='reasons' value='collaboration' id='Collaboration' onChange={handleCheck} />
								<label htmlFor='Collaboration'>Collaboration</label>

								<input type='checkbox' name='reasons' value='others' id='Sponsorship' onChange={handleCheck} />
								<label htmlFor='others'>others</label>
							</div>
						</div>
					</section>
					<input type='submit' value='Register' />
				</form>

				{/* <div className='sns'>
					<div className='google'>
						<FcGoogle />
					</div>
					<div className='kakao'>
						<RiKakaoTalkFill />
					</div>
				</div> */}
			</fieldset>
		</section>
	);
}

/*
	Fullname:  
	Username
	Email
	PhoneNumber
	Password
	Confirm Password
	sign-up reason
*/

/* 
	change 가 될 때마다  
	val state 가 변경된다. 
	val state 가 변경될 때마다 setTimeout 이 초기화 된 후 다시 할당된다.

	내가 궁금한 점은 val 가 변경될때마다 setState 호출을 막으려고 디바운싱을 하는건데 이러면 안되는거 아님? 
*/
