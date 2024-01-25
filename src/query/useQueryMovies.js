import { useQuery } from '@tanstack/react-query';

const path = process.env.PUBLIC_URL;

const fetchMovies = async () => {
	const response = await fetch(`${path}/DB/main.json`);
	const json = await response.json();
	const movies = json.movies;
	return movies;
};

export const useQueryMovies = () => {
	return useQuery(['fetchMovies'], fetchMovies, {
		refetchOnMount: false,
		refetchOnWindowFocus: false,
		cacheTime: 1000 * 60 * 60 * 24,
		staleTime: 1000 * 10,
		retry: 3 //데이터요청 실패시 재시도 횟수, default:3
	});
};
