import { useEffect, useState } from 'react';

export const useViewType = opt => {
	const defOpt = { mobile: 640, tablet: 1050, laptop: 1400 };
	const result = { ...defOpt, ...opt };
	const [ViewType, setViewType] = useState('');

	const getClientWid = () => {
		let wid = window.innerWidth;
		if (wid >= result.laptop) setViewType('');
		else if (wid >= result.tablet && wid < result.laptop)
			setViewType('Notebook');
		else if (wid >= result.mobile && wid < result.tablet) setViewType('Tablet');
		else if (wid >= 0 && wid < result.mobile) setViewType('Mobile');
	};

	useEffect(() => {
		getClientWid();
		window.addEventListener('resize', getClientWid);
		return () => window.removeEventListener('resize', getClientWid);
	}, []);

	// console.log('viewType: ' + Type);
	return { ViewType, setViewType };
};

// App component 의 life cycle 동안 등록될 addEventListener 처리하는 로직
/*  다른 프로젝트에서 재활용시 check 해 볼 요소 
	1. 모바일 화면에서 새로고침시 모바일 화면이 나오는가?
	2. width 를 변경해보고 eventListener 가 set 함수를 잘 호출하는지 체크
*/

/* 
  App componenet 에서 한 번 실행한 후 전역 컨텍스트로 다루기
*/
