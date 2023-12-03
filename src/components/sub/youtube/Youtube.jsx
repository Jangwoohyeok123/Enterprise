import './Youtube.scss';
import Layout from '../../common/layout/Layout';
import { useState, useEffect } from 'react';

export default function Youtube() {
	const [Vids, setVids] = useState([]);

	const fetchYoutube = async () => {
		const api_key = process.env.REACT_APP_YOUTUBE_API;
		const pid = process.env.REACT_APP_YOUTUBE_LIST;
		const num = 10;
		const baseURL = `https://www.googleapis.com/youtube/v3/playlistItems?key=${api_key}&part=snippet&playlistId=${pid}&maxResults=${num}`;
		//               https://www.googleapis.com/youtube/v3/playlistItems?key=${api_key}&part=snippet&playlistId=${playListId}&maxResults=${num}`;

		try {
			const data = await fetch(baseURL);
			const json = await data.json();
			setVids(json.items);
		} catch (err) {
			console.error(err);
		}
	};
	useEffect(() => {
		fetchYoutube();
	}, []);

	return <Layout title={'Youtube'}></Layout>;
}
