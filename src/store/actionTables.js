// 이 파일은 그냥 전역 STATE 관련된 작업을 하려고 하면 보면서 작업해라
// SERVER
export const DEPARTMENT = {
	start: 'DEPARTMENT_START',
	full: 'DEPARTMENT_FULLFILLED',
	rej: 'DEPARTMENT_REJECTED'
};

export const YOUTUBE = {
	start: 'YOUTUBE_START',
	full: 'YOUTUBE_FULLFILLED',
	rej: 'YOUTUBE_REJECTED'
};

export const FLICKR = {
	start: 'FLICKR_START',
	full: 'FLICKR_FULLFILLED',
	rej: 'FLICKR_REJECTED'
};

export const POSTS = {
	start: 'COMMUNITY_START',
	full: 'COMMUNITY_FULLFILLED',
	rej: 'COMMUNITY_REJECTED'
};

export const VIEWTYPE = {
	Notebook: 'Notebook',
	Tablet: 'Tablet',
	Mobile: 'Mobile'
};

//CLIENT
export const MODAL = {
	start: 'MODAL_START'
};

export const MENU = {
	start: 'MENU_START'
};

export const DARK = {
	start: 'DARK_START'
};

// 컴포넌트 또는 리듀서가 참조할 액션들을 모아둔 테이블과 의미가 비슷한 파일 보통 테이블은 너도보고 나도보는 공통의 자료를 표현할 때 사용한다.
