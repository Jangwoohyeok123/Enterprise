import { useQuery } from '@tanstack/react-query';

const fetchMain = async () => {
	const path = process.env.PUBLIC_URL;
	const res = await fetch(`${path}/DB/main.json`);
	const json = await res.json();

	return json;
};

export const useQueryMain = () => {
	return useQuery(['fetchMain'], fetchMain, {
		staleTime: 1000 * 60,
		cacheTimeTime: 1000 * 60,
		refetchOnMount: false,
		refetchOnWindowFocus: false,
		retry: 2
	});
};
