import { useQuery } from '@tanstack/react-query';

const path = process.env.PUBLIC_URL;

const fetchDepartment = async () => {
	const response = await fetch(`${path}/DB/department.json`);
	const json = await response.json();
	return json;
};

export const useQueryDepartment = () => {
	return useQuery(['fetchDepartment'], fetchDepartment, {
		refetchOnMount: false,
		refetchOnWindowFocus: false,
		cacheTime: 1000 * 60 * 60 * 24,
		staleTime: 1000 * 10,
		retry: 3 //데이터요청 실패시 재시도 횟수, default:3
	});
};

// useQuery 를 통해서 갖고오고
// isSuccess 를 통해서 useEffect 를 없앤다.
