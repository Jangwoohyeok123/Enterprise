import { useQuery } from '@tanstack/react-query';

const path = process.env.PUBLIC_URL;

const fetchCommunity = async () => {
	const data = await fetch(`${path.current}/DB/community.json`);
	const json = await data.json();
	json.posts.forEach(post => (post.enableUpdate = false));
	localStorage.setItem('posts', JSON.stringify(json.posts));
	return json.posts;
};

export const useQueryCommunity = () => {
	return useQuery(['fetchCommunity'], fetchCommunity, {
		staleTime: 1000 * 60 * 60 * 24, // server 가 따로 없으니 길게 잡는다.
		cacheTime: 1000 * 60 * 60 * 24, // stale 이 되면 메모리에 caching 할 시간
		refetchOnMount: false,
		refetchOnWindowFocus: false,
		retry: 2 // 요청 실패시 재 요청횟수
	});
};
