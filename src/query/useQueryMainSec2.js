import { useQuery } from '@tanstack/react-query';

const fetchSec2 = async () => {
	const path = process.env.PUBLIC_URL;
	const res = await fetch(`${path}/DB/main.json`);
	const json = await res.json();

	return json.sec2;
};

// fetch 함수의 key 를 부여해야 함
export const useQuerySec2 = () => {
	return useQuery(['fetchMainSection2'], fetchSec2, {
		staleTime: 1000,
		cacheTime: 1000 * 30
	});
};

/* 
  staleTime: fetching 한 이후 fresh 상태 시간  
  cacheTime: stale 상태가 됐을 때 저장하는 시간(cache 할 시간)
  refetchOnMount: 
  refetchOnWindowFocus
  retry
*/

/* 
  staleTime 은 stale 이 되는 시간 
  cacheTime 은 fetching 한 이후부터 caching 이 진행되는 시간
*/
