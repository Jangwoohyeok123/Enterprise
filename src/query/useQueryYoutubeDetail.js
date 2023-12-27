import { useQuery } from '@tanstack/react-query';

const fetchYoutubeDetail = async ({ queryKey }) => {
	const api_key = process.env.REACT_APP_YOUTUBE_API;
	const pid = process.env.REACT_APP_YOUTUBE_LIST;
	const num = 10;
	const baseURL = `https://www.googleapis.com/youtube/v3/playlistItems?key=${api_key}&part=snippet&playlistId=${pid}&maxResults=${num}`;
	const response = await fetch(baseURL);
	const json = await response.json();
	return json;
};

export const useQueryYoutubeDetail = id => {
	return useQuery(['fetchYoutube', id], fetchYoutubeDetail, {
		staleTime: 1000 * 60 * 60 * 24,
		cacheTime: 1000 * 60 * 60 * 24,
		refetchOnMount: false,
		refetchOnWindowFocus: false,
		retry: 2
	});
};
