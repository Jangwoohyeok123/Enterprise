import { useRef, useState, useEffect } from 'react';

export const useDebounce = (value, gap = 500) => {
	const [Mounted, setMounted] = useState(true);
	const [DebouncedVal, setDebouncedVal] = useState(value);
	const eventBlocker = useRef(null);
	clearTimeout(eventBlocker.current);

	// 훅을 호출한 컴포넌트가 언마운트되면 Mounted state 가 false 가 됨
	// 이벤트 큐에 등록된 콜백함수는 Mounte 가 false 기 때문에 value 에 접근못함
	eventBlocker.current = setTimeout(() => {
		Mounted && setDebouncedVal(value);
	}, gap);

	useEffect(() => {
		return () => setMounted(false);
	}, []);

	return DebouncedVal;
};
