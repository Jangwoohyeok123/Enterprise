import { useQuery } from '@tanstack/react-query';

const fetchGallery = async ({ queryKey: [_, opt] }) => {
	const num = 38;
	const flickr_api = process.env.REACT_APP_FLICKR_API;
	const baseURL = `https://www.flickr.com/services/rest/?&api_key=${flickr_api}&per_page=${num}&format=json&nojsoncallback=1&method=`;

	// flickr methods
	const methods = {
		interest: 'flickr.interestingness.getList',
		user: 'flickr.people.getPhotos',
		search: 'flickr.photos.search'
	};

	// 최종 fetch url
	const resultURLs = {
		interest: `${baseURL}${methods.interest}`,
		user: `${baseURL}${methods.user}&user_id=${opt.id}`,
		search: `${baseURL}${methods.search}&tags=${opt.keyword}`
	};

	let url = '';
	if (opt.type === 'interest') url = resultURLs.interest;
	else if (opt.type === 'user') url = resultURLs.user;
	else if (opt.type === 'search') url = resultURLs.search;

	const data = await fetch(url);
	const json = await data.json();
	return json;
};

export const useQueryGallery = opt => {
	return useQuery(['fetchGallery', opt], fetchGallery, {
		staleTime: 1000 * 60 * 60 * 24,
		acheTime: 1000 * 60 * 60 * 24,
		refetchOnMount: false,
		refetchOnWindowFocus: false,
		retry: 3
	});
};
