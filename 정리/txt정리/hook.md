## useScroll

[목표]

1. app Element 를 여러 컴포넌트에서 공유할 수 있다.
2. scrollTop 을 갖고오는 로직을 만들 수 있다.

[useScroll_청사진]

1. 커스텀 훅 안에서 스크롤을 적용할 엘리먼트를 참조하는 객체 생성
2. 커스텀 훅에서 스크롤을 적용할 참조객체 useEffect 를 통해 연결
3. 커스텀 훅에서 state 생성후 참조객체 할당
4. state 를 이용해서 처리하기

[고민거리]

1. getScrollTop 을 hook 에서 scroll event 까지 핸들링 해주는 것이 좋은지 훅을 사용하는 컴포넌트에서 사용하는게 좋은지 고민중임

=> 현재는 topButton 이 주 사용처이기 하지만 의존성을 높여높지 않기 위해서 일단은 topButton 쪽에서 처리하자

2. app Component 를 useRef 를 통해 제어하려고 하면 scrollTop 이 제어가 안됨
   app 을 ref 로 참조하고 state 에 담아서 제어해야 함
   => useRef 로 처리하는데 안되면 일단은 state 로 바꿔봐라

3.
