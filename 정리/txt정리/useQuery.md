## useQuery 함수를 만들 떄 필요한 것

1. fetch 함수를 만든다.
2. useQuery 를 통해 key 를 부여하고 fetch option 을 부여한다.

## 분석

1. fetch 한 데이터는 2가지로 나뉜다.

   => active 상태

   1. fresh 상태 : staletime 으로 제어
   2. stale 상태 : cache time 으로 stale 을 얼마나 보관할지 결정

   => inactive 상태 (컴포넌트 언마운트 되면)

   1. fresh 및 stale 모두 삭제
