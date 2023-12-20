import { FaFacebookF, FaTwitter, FaYoutube, FaGoogle, FaSpotify } from 'react-icons/fa';
import { FcGoogle } from 'react-icons/fc';
import { RiKakaoTalkFill } from 'react-icons/ri';
import './Signup.scss';
import { useHistory } from 'react-router-dom';
import { useEffect, useRef, useState } from 'react';

export default function Signup() {
	const history = useHistory();
	// reset 시 필요할 수 있기 때문에 useRef 처리한 후 state 할당
	const initVal = useRef({
		userid: '',
		email: '',
		password1: '',
		password2: '',
		reasons: [] // input checkbox 들은 배열로 관리한다.
	});
	// Signup page 는 value 를 담을 States 들과 Errors States 를 만들고 시작하자.
	const [States, setStates] = useState(initVal.current);
	const [Errors, setErrors] = useState([]);

	const handleChange = e => {
		// 입력할때마다 state 변경하기
		// const { name, value } = e.target;
		// setInputs({ ...Inputs, [name]: value });
		const { name, value } = e.target;
		setStates({ ...States, [name]: value });
	};

	const handleCheckBox = e => {
		// 체크할때마다 state 변경하기
		const { name } = e.target;
		// e.target 의 부모요소를 가서 input 들 긁어오기
		const inputs = e.target.parentElement.querySelectorAll('input');
		const checkArr = []; // check 한 배열을 담을 그릇
		inputs.forEach(input => input.checked && checkArr.push(input.value));
		setStates({ ...States, [name]: checkArr });
	};

	const handleSubmit = e => {
		e.preventDefault();
		// Errors States 를 분석하고 Error 가 없다면 가입을 승인하고 홈으로 이동시킨다.
		const errors = validation(States);

		let flag = true;
		// 객체를 iteration 하는게 안됨
		for (const key in errors) {
			if (errors[key] !== '') flag = false;
			// value 가 하나라도 없으면 flag 는 false 여야함
			// 이런 구조는 초기값을 true 로 두고 filtering 을 한번이라도 걸리면 false 가 되도록 만드는 구조를 짜면 됨 => algorithm 도 그렇고 자주 나옴 handler 공책에 적고 외워라
		}

		flag ? history.push('/') : alert('가입정보를 다시 확인해주세요');
	};

	const validation = States => {
		const error = {};
		// email
		const [before, after] = States.email.split('@');
		const afters = after && after.split('.');
		// 정규표현식
		const spc = /[!@#$%^&*()[\]_.+]/; // 특수문자 test 용도 표현식
		const num = /[0-9]/;

		if (States.userid.length < 5) error.userid = '최소 5글자 이상입력하세요';
		if (!before || !after || !afters[0] || !afters[1]) error.email = '올바른 이메일 형식을 기입하세요!';
		if (!(States.password1.length < 8) || !spc.test(States.password1) || !num.test(States.password1))
			error.password1 = '특수문자 및 숫자를 포함하세요.';
		if (States.password1 !== States.password2 || States.password2.length === 0)
			error.password2 = '비밀번호가 일치하지 않습니다.';
		if (States.reasons.length === 0) error.reasons = 'Reason 을 하나이상 체크해주세요';

		return error;
	};

	// 렌더링이 실행될때 마다 validation 을 진행하라
	// validation 을 진행한 후 반환한 error 를 Error State 에 저장
	// Dom 요소에 error 가 있다면 표기하기
	useEffect(() => {
		// validation(States);
		setErrors(validation(States));
	}, [States]);

	return (
		<section className='Signup'>
			<fieldset>
				<h1
					onClick={() => {
						history.push('/');
					}}>
					ENTERPRISE
				</h1>
				<legend className='hide'>signup page</legend>

				<form onSubmit={handleSubmit}>
					<section className='text-input'>
						<div className='text-input-1 input'>
							<label htmlFor='userid'>User id {Errors.userid && <strong>({Errors.userid})</strong>}</label>
							<input name='userid' type='text' id='name' placeholder='Enter User id' onChange={handleChange} />
						</div>

						<div className='text-input-2 input'>
							<label htmlFor='email'>Email {Errors.email && <strong>({Errors.email})</strong>}</label>
							<input name='email' type='text' id='email' placeholder='Enter email' onChange={handleChange} />
						</div>

						<div className='text-input-3 input'>
							<label htmlFor='password'>Password {Errors.password1 && <strong>({Errors.password1})</strong>}</label>
							<input
								name='password1'
								type='password'
								id='password'
								placeholder='Enter new password'
								onChange={handleChange}
							/>
						</div>

						<div className='text-input-4 input'>
							<label htmlFor='confirm-password'>
								Confirm password {Errors.password2 && <strong>({Errors.password2})</strong>}
							</label>
							<input
								name='password2'
								type='password'
								id='confirm-password'
								placeholder='Enter confirm password'
								onChange={handleChange}
							/>
						</div>
					</section>

					<section className='else-input'>
						<div className='reason'>
							<h3>Sign-up Reason {Errors.reasons && <strong>({Errors.reasons})</strong>}</h3>
							<div className='checkboxs'>
								<div className='checkbox'>
									<input type='checkbox' name='reasons' value='marketing' id='Marketing' onChange={handleCheckBox} />
									<label htmlFor='Marketing'>Marketing</label>
								</div>
								<div className='checkbox'>
									<input type='checkbox' name='reasons' value='trends' id='Market Trends' onChange={handleCheckBox} />
									<label htmlFor='Market Trends'>Market Trends</label>
								</div>
								<div className='checkbox'>
									<input
										type='checkbox'
										name='reasons'
										value='collaboration'
										id='Collaboration'
										onChange={handleCheckBox}
									/>
									<label htmlFor='Collaboration'>Collaboration</label>
								</div>
								<div className='checkbox'>
									<input type='checkbox' name='reasons' value='others' id='Sponsorship' onChange={handleCheckBox} />
									<label htmlFor='others'>others</label>
								</div>
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

/* 
	onChange 가 발생할 때 States 가 변경되지 않음
*/
