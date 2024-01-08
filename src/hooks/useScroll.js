import Anime from '../asset/anime';
import { useState, useEffect, useRef, useCallback } from 'react';

export function useScroll(customHandler, baseLine = window.innerHeight / 2) {
	const refEl = useRef(null);
	const [Frame, setFrame] = useState(null);

	const scrollTo = targetPos => {
		Frame && new Anime(Frame, { scroll: targetPos });
	};

	const getCurrentScroll = useCallback(() => {
		const scroll = Frame.scrollTop + baseLine;
		const modifiedScroll = scroll - refEl.current?.offsetTop;
		return modifiedScroll;
	}, [Frame, baseLine]);

	// custom 함수 wrapping 함수로서 app 의 scroll event 를 핸들링한다.
	// scroll 이 일어날 떄마다 scrollTop 을 변형하여 customHandler 를 실행한다. custom 훅은 modifeidScroll 이 0 이상일 떄 실행된다.
	const handleScroll = useCallback(() => {
		const scroll = getCurrentScroll();
		if (scroll >= 0) {
			customHandler(scroll);
		}
	}, [getCurrentScroll, customHandler]);

	useEffect(() => {
		setFrame(document.querySelector('.App'));
	}, []);

	useEffect(() => {
		Frame?.addEventListener('scroll', handleScroll);
		return () => Frame?.removeEventListener('scroll', handleScroll);
	}, [Frame, handleScroll]);

	return { scrollTo, getCurrentScroll, Frame, refEl };
}

/* 
	[ component 설명 ]

  useScroll은 임의의 페이지에 일부 section 에서 parallax effect 를 적용하기 위해 고안됐다. useScroll 을 사용하면 App의 최상위요소에 scroll event 가 발생하면 제어할 인자로 전달받은 customHandler 가 추가된다. 

	getCurrentScroll 는 scrollTop 을 측정한다. 만약, parallax 효과 적용지점을 조정하려면 baseLine 을 이용한다. 만약, baseline 이 400 이라면 parallax 가 targetSection 의 400px 윗 지점에서부터 효과가 생긴다. 또한, getCurrentScroll 은 `scroll - refEl.offsetTop` 을 이용해 섹션에 스크롤이 도착했을 때 scroll 값이 0부터 시작하도록 만든다. 이는 style 속성을 제어할 때 편리함을 제공한다.
	
	- scroll: app component 의 scroll 값 
	- baseline: effect 효과 발생지점조절 값으로서 클 수록 요소의 위에서 반응함
	- ref.current.offsetTop: section 의 topborder 의 위치와 page 최상단까지의 거리
	- modifiedScroll: section 에 도착하면 0 부터 시작할 scroll 값으로 실질적으로 사용될 scroll 이다. [offsetTop - (scroll - baseline)]
*/
