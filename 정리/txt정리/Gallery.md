## handler 정리

[하나의 react query 를 이용해서 여러가지 ui 처리하기]

=> 착각하고 있던 것
state 가 변경되면 return 문 위에 로직도 당연히 state 변경에 의해서 영향을 받는다.

# react query 를 사용할 때 자주 사용될 수 밖에 없는 로직이다. 암기하자

=> useQuery 를 통해서 Pics 를 렌더링한뒤 setState 를 통해 쿼리키를 변경할 때 마다 재 렌더링이 일어나게 하고 reactQuery 가 다시 실행되게 한다.
=> reactQeury 를 재 렌더링시 queryKey 를 비교하여 이전에 있던 데이터면 쿼리를 진행하지 않고 그렇지 않으면 쿼리를 진행한다.

# activation 에서 setOpt 를 호출한다
