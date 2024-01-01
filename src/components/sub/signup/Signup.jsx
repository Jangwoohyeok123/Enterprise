// 리액트
import './Signup.scss';
import { useHistory } from 'react-router-dom';
import { useEffect, useRef, useState } from 'react';
import { FaRegUser } from 'react-icons/fa6';
import { MdLockOutline } from 'react-icons/md';
import { FaCheck } from 'react-icons/fa6';
import { MdPermContactCalendar } from 'react-icons/md';
import { BsCalendar3 } from 'react-icons/bs';
import { FiSmartphone } from 'react-icons/fi';

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
	// checkArr.push(input.value)
	const handleCheckBox = e => {
		// 체크할때마다 state 변경하기
		const { name } = e.target;
		// e.target 의 부모요소를 가서 input 들 긁어오기
		const inputs = e.target.parentElement.parentElement.querySelectorAll('input');
		const checkArr = []; // check 한 배열을 담을 그릇
		inputs.forEach(input => input.checked && checkArr.push(input));
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

	const path = process.env.PUBLIC_URL;

	return (
		<section className='Signup'>
			<h1
				className='title'
				onClick={() => {
					history.push('/');
				}}>
				LOGO
			</h1>
			<fieldset>
				<form onSubmit={handleSubmit}>
					<legend className='hide'>signup page</legend>

					<div className='form-list'>
						<div className='item user'>
							<FaRegUser className='icon' />
							<input type='text' placeholder='Id' />
						</div>
						<div className='item password1'>
							<MdLockOutline className='icon' />
							<input type='password' placeholder='Password' />
						</div>
						<div className='item password2'>
							<FaCheck className='icon' />
							<input type='password' placeholder='Confirm Password' />
						</div>
					</div>
					<div className='error-zone'></div>
					<div className='form-list'>
						<div className='item name'>
							<FaRegUser className='icon' />
							<input type='text' placeholder='Name' />
						</div>
						<div className='item birthday'>
							<BsCalendar3 className='icon' />
							<input type='text' placeholder='Birthday 8자리' />
						</div>
						<div className='item genderContainer'>
							<ul>
								<li>
									<label htmlFor='gender1'>Man</label>
									<input type='radio' name='gender' id='gender1' value='man' />
								</li>
								<li>
									<label htmlFor='gender2'>Woman</label>
									<input type='radio' name='gender' id='gender2' value='woman' />
								</li>
								<li>
									<label htmlFor='gender3'>Others</label>
									<input type='radio' name='gender' id='gender3' value='other' />
								</li>
							</ul>
						</div>
						<div className='item number'>
							<FiSmartphone className='icon' />
							<input type='text' placeholder='Phone Number' />
						</div>
					</div>
					<div className='error-zone'></div>
				</form>
			</fieldset>
			<button className='submit'>SIGN UP</button>
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
	onChange 가 발생할 때 States 가 변경되지 않음
*/

/* [debouncing 에 관한 궁금점 해결] 
	debouncing 하는 것은 하나의 state 를 wrapping 해서 extension 하는 것이 아니라 화면을 위한 state 와 checking 을 위한 debouncing 된 state 를 별도로 만드는 작업이다.
*/

/* 
	submit 을 하면 전체 input 을 다시 검사한다.


*/
