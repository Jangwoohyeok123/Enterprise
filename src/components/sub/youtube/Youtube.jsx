import './Youtube.scss';
import Layout from '../../common/layout/Layout';
import { useState, useEffect } from 'react';

export default function Youtube() {
	const [Vids, setVids] = useState([]);

	const fetchYoutube = async () => {
		const api_key = process.env.REACT_APP_YOUTUBE_API; // Cloud 에서 받아옴
		const playListId = process.env.REACT_APP_YOUTUBE_LIST; // youtube url 뒤에 있음
		const num = 10;
		const url = `https://www.googleapis.com/youtube/v3/playlistItems?key=${api_key}&part=snippet&playlistId=${playListId}&maxResults=${num}`;
		const data = await fetch(url);
		const json = await data.json();
		setVids(json.items);
	};

	useEffect(() => {
		fetchYoutube();
	}, []);

	return <Layout title={'Youtube'}></Layout>;
}
