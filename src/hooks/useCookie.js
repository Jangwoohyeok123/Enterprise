/* 
  Cookie
  : 클라이언트 컴퓨터에 저장되는 데이터
  : 서버에서 데이터를 전달할 때 header 객체에 전달하는 키와 value 한 쌍을 말함(4kb)
  : 사용자 컴퓨터 메모리에 저장되는 구조라 브라우저를 닫아도 문제가 생기지 않음 
  : 만료일이 존재하고 사용자가 설정가능, 만약 만료일을 지정하지 않으면 브라우저를 닫는 순간 삭제
  
  Session 
  : Session 은 서버쪽에 저장되는 데이터를 말함 
  : 주요한 데이터는 session 에 넣는다.

  session: 사용자 정보, cookie: 장바구니 정보

  localStorage 와 cookie 의 쓰임새 
  1. 둘다 사용자컴퓨터의 메모리를 사용함
  2. 로컬 스토리지는 5mb cookie 는 4kb 임
  3. Cookie 는 만료일 지정가능함
  4. 로컬 스토리지는 만료일이 없음 
*/

/* 
  만료시간 = 현재시간 + time 
  쿠키의 expires 속성을 만료시간으로 설정해서 발행
*/
// export function useCookie(name, value, time) {
// 	let now = new Date();
// 	let duedate = now.getTime() + 1000 * time; // 만료시간
// 	now.setTime(duedate); // 시간값을 만료시간을 변경
// 	document.cookie = `${name}=${value}; path=/; expires=${now.toUTCString()}`; // 한국시로 구한 만료시간을 전세계 표준시로 변환해서 쿠키값을 만료시간값으로 설정
// }

export function useCookie() {
	/*
    쿠키생성
    쿠키삭제 => duration 0 주면됨 
	 */
	const createCookie = (name, value, duration) => {
		let now = new Date();
		let dueDate = now.getTime() + 1000 * duration;
		now.setTime(dueDate);
		document.cookie = `${name}=${value}; path=/; expires=${now.toUTCString()}`;
	};

	const deleteCookie = (name, value) => {
		createCookie(name, value, 0);
	};

	const isCookie = cookieName => {
		if (document.cookie.indexOf(cookieName) < 0) return false;
		else return true;
	};

	const viewCookie = () => console.log(document.cookie);

	return { createCookie, deleteCookie, isCookie, viewCookie };
}
