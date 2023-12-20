// throttling 반복횟수를 줄이는 방법
// debouncing 이벤트 발생시 핸들러 함수 호출을 뒤로 미루는 방법

import { useRef } from 'react';

export const useThrottle = func => {
	// 컴포넌트에 eventBlock 참조변수를 추가함
	const eventBlocker = useRef(null);

	// 이 함수는 useThrottle 함수를 통해 컴포넌트에 생성된 eventBlocker 만 다루는 내부함수임
	return () => {
		// 만약에 evenetBlock(타이머)가 있다면 타이머를 참조변수에 덮어씌우지 않음 이미 참조변수에 타이머가 있기 때문임
		if (eventBlocker.current == true) return;
		// 만약에 타이머가 없다면 타이머를 참조변수에 덮어씌움
		eventBlocker.current = setTimeout(() => {
			// 타이머는 일정시간뒤에 인수로 전달된 함수를 호출함
			func();
			// 호출하면 타이머를 초기화 시킨다. 왜냐하면 useThrottle 함수에게 전달될 함수는 컴포넌트에세 모종의 이유로 계속해서 반복되며 실행될 함수다.
			eventBlocker.current = null;
		}, 300);
	};
};

// 쓰로틀링 시키고 싶은 함수가 있는 컴포넌트에 추가하기
// 1. const throttledFunc = useThrottle(Func);
// 2. 기존의 Func 위치를 throttledFunc 로 치환한다.

/* 



*/
