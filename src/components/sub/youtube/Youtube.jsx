import './Youtube.scss';
import { useState, useEffect, useRef } from 'react';

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

	const path = useRef(process.env.PUBLIC_URL);

	useEffect(() => {
		fetchYoutube();
	}, []);

	return (
		<main className='Youtube'>
			<section className='Youtube-headerSection'>
				<img className='mainImage' src={`${path.current}/img/youtube/main1.jpg`} alt='' />
				<div>
					<h1>
						Our
						<br />
						Youtube
					</h1>
				</div>
			</section>

			<section className='Youtube-bodySection'>
				{Vids.map((video) => {
					const [date, time] = video.snippet.publishedAt.split('T');

					return (
						<article>
							<h2>{video.snippet.title}</h2>
							<span>{video.snippet.description}</span>
							<img src={video.snippet.thumbnails.standard.url} alt={video.snippet.title} />
						</article>
					);
				})}
			</section>
		</main>
	);
}
