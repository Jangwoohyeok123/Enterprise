import { useRef } from 'react';

// 비동기 데이터를 불러온 후 ui 를 렌더링하면서 ref 를 꽂아 넣고 싶을 떄 사용하는 훅
export const useCreateRef = element => {
	const ref = useRef();

	return () => {
		// element 에 ref 를 할당해야 한다.
	};
};
