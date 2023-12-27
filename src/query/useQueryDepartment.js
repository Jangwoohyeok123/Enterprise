import { useQuery } from '@tanstack/react-query';

const path = process.env.PUBLIC_URL;

const fetchDepartment = async () => {
	const response = await fetch(`${path}/DB/department.json`);
	const json = await response.json();
	return json;
};

export const useDepartmentQuery = () => {
	return useQuery(['fetchDepartment'], fetchDepartment, {
		staleTime: 1000 * 60 * 60 * 24,
		cacheTime: 1000 * 60 * 60 * 24,
		refetchOnMount: false,
		refetchOnWindowFocus: false,
		retry: 2 // 요청 실패시 재 요청횟수
	});
};
