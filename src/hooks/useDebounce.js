import { useRef, useState } from 'react';

export const useDebounce = (value, gap = 500) => {
	const [DebouncedVal, setDebouncedVal] = useState(value);
	const timer = useRef(null); //setTimeout의 리턴값을 받을 참조객체

	//인수로 받은 state값이 변경될때마다 setTimeout구문의 호출을 계속 초기화
	clearTimeout(timer.current);

	timer.current = setTimeout(() => {
		setDebouncedVal(value);
	}, gap);

	return DebouncedVal;
};

/* 
  커스텀 훅안에 useState 를 통해서 state 를 만들어 놓으면 훅을 호출한 컴포넌트의 state 처럼 커스텀 훅의 state 가 변경되면 컴포넌트가 재렌더링된다.
*/

/* useDebounce 훅을 호출하면... 
  인자로 받은 변수를 디바운스를 적용할 state 로 선언한다.

  setState 를 호 
*/
