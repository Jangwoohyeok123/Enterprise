import { useRef, useState } from 'react';

// useDebounc 또는 useThrottle 에 들어올 인자는 컴포넌트에서 계속 반복해서 호출하는 특징이 있음
export const useDebounce = (value, gap = 500) => {
	const [DebouncedVal, setDebouncedVal] = useState(value);
	const eventBlocker = useRef(null);

	clearTimeout(eventBlocker.current);

	eventBlocker.current = setTimeout(() => {
		setDebouncedVal(value);
	}, gap);

	return DebouncedVal;
};

/*  Debouncing 적용하기 

1. 디바운싱을 적용하고 싶은 컴포넌트에서
const DebouncedVal = useDebounce(Val); // Val 는 state 값

2. 기존의 setState(디바운싱적용전 state)

*/
