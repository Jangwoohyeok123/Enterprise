import { useQuery } from '@tanstack/react-query';

const fetchGallery = async ({ queryKey: [_, opt] }) => {
	const num = 36;
	const flickr_api = process.env.REACT_APP_FLICKR_API;
	const baseURL = `https://www.flickr.com/services/rest/?&api_key=${flickr_api}&per_page=${num}&format=json&nojsoncallback=1&method=`;

	// flickr methods
	const method = {
		interest: 'flickr.interestingness.getList',
		user: 'flickr.people.getPhotos',
		search: 'flickr.photos.search'
	};

	// 최종 fetch url = baseurl + flickr Method + option
	const resultURL = {
		interest: `${baseURL}${method.interest}`,
		user: `${baseURL}${method.user}&user_id=${opt.id}`,
		search: `${baseURL}${method.search}&tags=${opt.keyword}`
	};

	let url = '';
	if (opt.type === 'interest') url = resultURL.interest;
	if (opt.type === 'user') url = resultURL.user;
	if (opt.type === 'search') url = resultURL.search;

	const data = await fetch(url);
	const json = await data.json();
	if (json.photos.photo.length === 0)
		throw new Error('photo length 가 0입니다.');
	return json.photos.photo;
};

export const useQueryGallery = opt => {
	if (opt.type === 'user' && !opt.id) opt.id = '25986582@N05';
	return useQuery(['fetchGallery', opt], fetchGallery, {
		staleTime: 1000 * 60 * 60 * 24,
		acheTime: 1000 * 60 * 60 * 24,
		refetchOnMount: false,
		refetchOnWindowFocus: false,
		retry: 3
	});
};
