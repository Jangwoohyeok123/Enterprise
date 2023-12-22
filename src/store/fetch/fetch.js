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

export const fetchFlickr = async opt => {
	const num = 36;
	const flickr_api = process.env.REACT_APP_FLICKR_API;
	const baseURL = `https://www.flickr.com/services/rest/?&api_key=${flickr_api}&per_page=${num}&format=json&nojsoncallback=1&method=`;
	const method_interest = 'flickr.interestingness.getList';
	const method_user = 'flickr.people.getPhotos';
	const method_search = 'flickr.photos.search'; //search method 추가
	const interestURL = `${baseURL}${method_interest}`;
	const userURL = `${baseURL}${method_user}&user_id=${opt.id}`;
	const searchURL = `${baseURL}${method_search}&tags=${opt.keyword}`; //search url 추가
	let url = '';
	opt.type === 'user' && (url = userURL);
	opt.type === 'interest' && (url = interestURL);
	opt.type === 'search' && (url = searchURL);
	const data = await fetch(url);
	const json = await data.json();
	const photos = json.photos.photo;

	return photos;
};

// 비동기로 전역 state 등록 및 localStorage 에 등록
export const fetchPosts = async () => {
	const data = await fetch(`${path}/DB/community.json`);
	const json = await data.json();
	json.posts.forEach(post => (post.enableUpdate = false));
	localStorage.setItem('posts', JSON.stringify(json.posts));
	return json;
};

// saga 가 action 객체를 intercept 한 후 실행할 fetch 함수들을 모아두는 공간
