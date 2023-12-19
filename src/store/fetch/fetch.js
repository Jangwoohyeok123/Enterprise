const path = process.env.PUBLIC_URL;

export const fetchDepartment = async () => {
	const data = await fetch(`${path}/DB/department.json`);
	const json = data.json();
	return json;
};

export const fetchCommunity = async () => {
	const data = await fetch(`${path}/DB/community.json`);
	const json = data.json();
	return json;
};

// saga 가 action 객체를 intercept 한 후 실행할 fetch 함수들을 모아두는 공간
