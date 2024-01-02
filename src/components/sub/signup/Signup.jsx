// 리액트
import './Signup.scss';
import { useHistory } from 'react-router-dom';
import { useEffect, useRef, useState } from 'react';
import { FaRegUser } from 'react-icons/fa6';
import { MdLockOutline } from 'react-icons/md';
import { FaCheck } from 'react-icons/fa6';
import { BsCalendar3 } from 'react-icons/bs';
import { FiSmartphone } from 'react-icons/fi';

export default function Signup() {
	const history = useHistory();
	const path = process.env.PUBLIC_URL;
	const refForm = useRef(null);
	const initVal = useRef({
		userid: '',
		password1: '',
		password2: ''
	});
	const [FirstForm, setFirstForm] = useState(
		initVal.current
	);
	const [FirstFormError, setFirstFormError] = useState(
		initVal.current
	);

	const initVal2 = useRef({
		name: '',
		birthday: '',
		gender: '',
		number: ''
	});
	const [SecondForm, setSecondForm] = useState(
		initVal2.current
	);
	const [SecondFormError, setSecondFormError] = useState(
		initVal2.current
	);
	const [Genders, setGenders] = useState([
		'Woman',
		'Man',
		'Other'
	]);

	// onChnage 할 때 마다 timer 만들기

	/*	 
		event 를 이용해 input 사용하는 방법
		name: e.target.name 속성을 통해 input 한 값의 이름을 지정할 수 있음 
		value: e.target.value 속성을 통해 input 태그의 사용자 입력값을 사용할 수 있음 

		=> e.target.name && e.target.value 는 암기해라
	*/
	const handleChangeFirstForm = e => {
		const { name, value } = e.target;
		setFirstForm({ ...FirstForm, [name]: value });
	};

	const handleChangeSecondForm = e => {
		const { name, value } = e.target;
		setSecondForm({ ...SecondForm, [name]: value });
	};

	const handleGender = e => {
		const { name, value } = e.target;
		setSecondForm({ ...SecondForm, [name]: value });
	};

	const handleSubmit = e => {
		e.preventDefault();
		if (validationAll()) alert('server 전송');

		function validationAll(State) {
			const firstKeys = Object.keys(FirstFormError);
			const secondKeys = Object.keys(SecondFormError);
			let flag1 = false;
			let flag2 = false;

			for (const key in FirstFormError) {
				if (FirstFormError[key] === '') flag1 = true;
				else {
					flag1 = false;
					break;
				}
			}

			for (const key in SecondFormError) {
				if (SecondFormError[key] === '') flag2 = true;
				else {
					flag2 = false;
					break;
				}
			}

			// firstKeys.forEach(key => {
			// 	console.log(firstKeys[key]);
			// 	if (FirstFormError[key] !== '') flag = false;
			// 	else flag = true;
			// });

			// secondKeys.forEach(key => {
			// 	if (SecondFormError[key] !== '') flag = false;
			// 	else flag = true;
			// });

			return flag1 && flag2;
		}
	};

	// userid, password1, password2
	// name, birthday, gender, number

	const validation = states => {
		const keys = Object.keys(states);

		if (keys.includes('userid')) {
			const errs = {
				userid: '',
				password1: '',
				password2: ''
			};
			// userid: 영문과 숫자로 구성돼야한다..
			// password1: 대소문자 영문, 특수문자, 숫자로 구성돼야한다.
			// password2: password1 과 같아야 한다.
			// error 가 있다면 return 하고 setError 를 진행한다.
			const useridReg = /^(?=.*[a-zA-Z])[a-zA-Z0-9]{6,12}$/;
			const password1Reg =
				/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*()~])[a-zA-Z0-9!@#$%^&*()]{8,16}$/;

			if (!useridReg.test(states.userid)) {
				errs.userid = 'Please provide an alternative ID.';
			}
			if (!password1Reg.test(states.password1))
				errs.password1 =
					'Please use 8 to 16 characters including uppercase and lowercase letters, numbers, and special characters.';
			if (states.password1 !== states.password2)
				errs.password2 = 'The passwords do not match.';

			return errs;
		} else {
			const errs = {
				name: '',
				birthday: '',
				gender: '',
				number: ''
			};
			// name: 영문으로 구성돼야한다.
			// birthday: 8자리의 수로 이뤄져야한다.
			// gender 가 선택돼야 한다.
			// number 가 11 자리의 숫자로 이뤄지며 앞의 3 개의 수는 010 이어야한다.
			// error 가 있다면 return 하고 setError 를 진행한다.
			const nameReg = /^[a-zA-Z]{3,30}$/;
			const birthdayReg = /^[0-9]{8}$/;
			const numberReg = /^010[0-9]{8}$/;

			if (!nameReg.test(states.name))
				errs.name = 'Please cofirm your name.';
			if (birthdayReg.test(states.birthday))
				checkBirthday();
			else
				errs.birthday =
					'Please enter your birthdate in exactly 8 characters. ex) 20130725';
			if (!states.gender.length)
				errs.gender = 'Please choose gender.';
			if (!numberReg.test(states.number))
				errs.number =
					'The number must consist of 11 digits.';

			function checkBirthday() {
				const curYear = Number(states.birthday.slice(0, 4));
				const curMonth = Number(
					states.birthday.slice(4, 6)
				);
				const curDay = Number(states.birthday.slice(6));

				const maxYear = new Date().getFullYear();

				if (
					curYear < 1900 ||
					curYear > maxYear ||
					curMonth > 13 ||
					curMonth < 1 ||
					curDay > 31 ||
					curDay < 1
				) {
					errs.birthday =
						'Please enter your birthdate in exactly 8 characters. ex) 20130725';
				}
			}

			return errs;
		}
	};
	// useEffect(() => {
	// 	// validation(States);
	// 	setErrors(validation(States));
	// }, [States]);

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
				<form ref={refForm}>
					<legend className='hide'>signup page</legend>

					<div className='form-list'>
						<div className='item user'>
							<FaRegUser className='icon' />
							<input
								type='text'
								name='userid'
								placeholder='Id'
								onChange={handleChangeFirstForm}
								onBlur={() => {
									setFirstFormError(validation(FirstForm));
								}}
							/>
						</div>
						<div className='item password1'>
							<MdLockOutline className='icon' />
							<input
								type='password'
								name='password1'
								placeholder='Password'
								onChange={handleChangeFirstForm}
								onBlur={() =>
									setFirstFormError(validation(FirstForm))
								}
							/>
						</div>
						<div className='item password2'>
							<FaCheck className='icon' />
							<input
								type='password'
								name='password2'
								placeholder='Confirm Password'
								onChange={handleChangeFirstForm}
								onBlur={() =>
									setFirstFormError(validation(FirstForm))
								}
							/>
						</div>
					</div>
					<div className='error-zone'>
						{FirstFormError.userid && (
							<div>User id: {FirstFormError.userid}</div>
						)}
						{FirstFormError.password1 && (
							<div>
								Password: {FirstFormError.password1}
							</div>
						)}
						{FirstFormError.password2 && (
							<div>
								Confirm password:{FirstFormError.password2}
							</div>
						)}
					</div>
					<div className='form-list'>
						<div className='item name'>
							<FaRegUser className='icon' />
							<input
								type='text'
								name='name'
								placeholder='Name'
								onChange={handleChangeSecondForm}
								onBlur={() =>
									setSecondFormError(validation(SecondForm))
								}
							/>
						</div>
						<div className='item birthday'>
							<BsCalendar3 className='icon' />
							<input
								type='text'
								name='birthday'
								placeholder='Birthday 8 digitis'
								onChange={handleChangeSecondForm}
								onBlur={() =>
									setSecondFormError(validation(SecondForm))
								}
							/>
						</div>
						<div className='item genderContainer'>
							<ul tabIndex={0}>
								{Genders.map((gender, idx) => {
									if (gender === SecondForm.gender) {
										return (
											<li
												key={gender + idx}
												className='outline'>
												<label htmlFor={gender}>
													{gender}
												</label>
												<input
													type='radio'
													name='gender'
													id={gender}
													value={gender}
													onClick={handleGender}
													onBlur={() =>
														setSecondFormError(
															validation(SecondForm)
														)
													}
												/>
											</li>
										);
									} else {
										return (
											<li key={gender + idx}>
												<label htmlFor={gender}>
													{gender}
												</label>
												<input
													type='radio'
													name='gender'
													id={gender}
													value={gender}
													onClick={handleGender}
													onBlur={() =>
														setSecondFormError(
															validation(SecondForm)
														)
													}
												/>
											</li>
										);
									}
								})}
							</ul>
							{/* htmlFor, id 를 명확히 기입하지 않으면 nodeList 제어하기가 힘들다. */}
						</div>
						<div className='item number'>
							<FiSmartphone className='icon' />
							<input
								type='text'
								name='number'
								placeholder='Phone Number'
								onChange={handleChangeSecondForm}
								onBlur={() =>
									setSecondFormError(validation(SecondForm))
								}
							/>
						</div>
					</div>
					<div className='error-zone'>
						{SecondFormError.name && (
							<div>Name: {SecondFormError.name}</div>
						)}
						{SecondFormError.birthday && (
							<div>
								Birthday: {SecondFormError.birthday}
							</div>
						)}
						{SecondFormError.gender && (
							<div>Gender: {SecondFormError.gender}</div>
						)}
						{SecondFormError.number && (
							<div>Number: {SecondFormError.number}</div>
						)}
					</div>
					<div className='error-zone'></div>
				</form>
			</fieldset>
			<button className='submit' onClick={handleSubmit}>
				SIGN UP
			</button>
		</section>
	);
}
