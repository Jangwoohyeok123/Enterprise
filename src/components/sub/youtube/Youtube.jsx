import './Youtube.scss';
import Layout from '../../common/layout/Layout';
import { useState, useEffect } from 'react';

export default function Youtube() {
	const [Vids, setVids] = useState([]);

	const fetchYoutube = async () => {
		const api_key = 'AIzaSyBdiwuRjRbibBfsczkDmMDvmo0PMxc52Uo'; // Cloud 에서 받아옴
		const playListId = 'PLXHEb7aXbmnWFoUJqvVtMmkRJaNK0i3is'; // youtube url 뒤에 있음
		const num = 10;
		const url = `https://www.googleapis.com/youtube/v3/playlistItems?key=${api_key}&part=snippet&playlistId=${playListId}&maxResults=${num}`;
		const data = await fetch(url);
		const json = await data.json();
		setVids(json.items);
		console.log(Vids);
	};

	useEffect(() => {
		fetchYoutube();
	}, []);

	return <Layout title={'Youtube'}></Layout>;
}
