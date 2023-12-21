const path = process.env.PUBLIC_URL;

// fetch 한 이후 json 으로 전역 state 화 시켜놓음
export const fetchDepartment = async () => {
	const data = await fetch(`${path}/DB/department.json`);
	const json = data.json();
	return json;
};

export const fetchYoutube = async () => {
	const api비밀키 = process.env.REACT_APP_YOUTUBE_API; // Cloud 에서 받아옴
	const 저장소이름 = process.env.REACT_APP_YOUTUBE_LIST; // youtube url 뒤에 있음
	const 요청사진개수 = 5;
	const 최종주소 = `https://www.googleapis.com/youtube/v3/playlistItems?key=${api비밀키}&part=snippet&playlistId=${저장소이름}&maxResults=${요청사진개수}`;
	const data = await fetch(최종주소);
	const json = await data.json();
	return json; // 요청 함수
};

export const fetchCommunity = async () => {
	const data = await fetch(`${path}/DB/community.json`);
	const json = data.json();
	return json;
};

// saga 가 action 객체를 intercept 한 후 실행할 fetch 함수들을 모아두는 공간
