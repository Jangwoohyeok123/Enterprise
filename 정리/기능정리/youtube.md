# 비동기 함수가 있다면 호출방법

1. fetch 함수가 있을 때는 async 함수로 wrapping 함
2. fetch 함수에 await 를 붙임 => 동기화가 됨

[ async await ]

1. promise 반환함수를 async 를 통해 감싸야함
2. await 문은 promise 반환함수(비동기)에만 지정가능 => 일반함수 앞에 no!

[ async await 의 try-catch ]

try {
프로미스반환 함수호출
} catch(e) {
예외처리 ex) api 호출 실패시 다른 함수 호출하기
}

# api 호출 정보

1. 개인키(api_key)는 google console 에서 찾아서 사용함
2. playListId 는 유튜브에서 플리창 들어가서 url 에서 받아옴

# 이미지와 텍스트

텍스트는 height 빼기
이미지는 width, height, object-fit: cover

를 실행하라
