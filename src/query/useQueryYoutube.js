import { useQuery } from '@tanstack/react-query';

const fetchYoutube = async () => {
	const api_key = process.env.REACT_APP_YOUTUBE_API;
	const pid = process.env.REACT_APP_YOUTUBE_LIST;
	const num = 10;
	const baseURL = `https://www.googleapis.com/youtube/v3/playlistItems?key=${api_key}&part=snippet&playlistId=${pid}&maxResults=${num}`;
	const response = await fetch(baseURL);
	const json = await response.json();

	return json.items;
};

export const useQueryYoutube = () => {
	return useQuery(['fetchYoutube'], fetchYoutube, {
		staleTime: 2000,
		cacheTime: 1000 * 3000,
		refetchOnMount: false,
		refetchOnWindowFocus: false,
		retry: 2
	});
};
