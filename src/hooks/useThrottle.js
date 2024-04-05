import { useRef } from 'react';

export const useThrottle = (func, gap = 500) => {
	const timer = useRef(null);

	return () => {
		// timer 가 있다면 함수 호출 x
		if (timer.current) return;

		// timer 가 없다면 timer 를 만들면서 함수 호출
		timer.current = setTimeout(() => {
			func();
			timer.current = null;
		}, gap);
	};
};
