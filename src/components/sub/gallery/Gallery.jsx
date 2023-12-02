import { useEffect, useState } from 'react';
import './Gallery.scss';
import Layout from '../../common/layout/Layout';

export default function Gallery() {
	const [Pics, setPics] = useState([]);

	const fetchFlickr = async () => {
		const flickr_api = '52602ca25cab9b4f2bf4e422b63f1bd0';
		const host = 'https://www.flickr.com/services/rest/';
		const methodInterestingness = 'flickr.interestingness.getList';
		const picNum = 500; // 앞으로 개수는 Num 으로 통일한다.
		const reqUrl = `${host}?method=${methodInterestingness}&api_key=${flickr_api}&per_page=${picNum}&format=json&nojsoncallback=1`;
		const data = await fetch(reqUrl);
		const json = await data.json();
		console.log(json);
	};

	useEffect(() => {
		fetchFlickr();
	}, []);

	return <Layout></Layout>;
}

// json 으로 데이터가 날라오지 않는경우가 있음

/* 
#
# Example
#   server-id: 7372
#   photo-id: 12502775644
#   secret: acfd415fa7
#   size: w
#
'https://live.staticflickr.com/7372/{id}_{secret}_{size-suffix}.jpg'
'https://live.staticflickr.com/{server-id}/{id}_{secret}_{size-suffix}.jpg'
*/
