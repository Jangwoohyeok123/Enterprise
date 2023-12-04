import useTextMethod from '../../../hooks/useText';
import Layout from '../../common/layout/Layout';
import './Youtube.scss';
import { useState, useEffect, useRef } from 'react';

export default function Youtube() {
	const [Vids, setVids] = useState([]);
	const [Title, setTitle] = useState('NORM ARCHITECTS STUDIO WAS FOUNDED IN 2008');

	const fetchYoutube = async () => {
		const api비밀키 = process.env.REACT_APP_YOUTUBE_API; // Cloud 에서 받아옴
		const 저장소이름 = process.env.REACT_APP_YOUTUBE_LIST; // youtube url 뒤에 있음
		const 요청사진개수 = 10;
		const 최종주소 = `https://www.googleapis.com/youtube/v3/playlistItems?key=${api비밀키}&part=snippet&playlistId=${저장소이름}&maxResults=${요청사진개수}`;
		const data = await fetch(최종주소);
		const json = await data.json();
		setVids(json.items); // 요청 함수
	};

	const slice = useTextMethod('slice');

	// useRef 는 return 문에서 활용하면 안된다.
	// youtube 사이트에 사용자가 머무를 동안 유지될 변수
	const path = useRef(process.env.PUBLIC_URL);

	// 줄세우기 함수
	useEffect(() => {
		fetchYoutube();
	}, []);

	return (
		<Layout title={Title} className='Youtube'>
			<section className='introduce'>
				We found <strong>20 projects</strong> videos for you
			</section>
			<section className='articles'>
				{Vids.map((video) => {
					const [date, tmpTime] = video.snippet.publishedAt.split('T');
					const time = tmpTime.slice(0, tmpTime.length - 1);
					return (
						<article>
							<div className='text'>
								<div className='head'>
									<h2>{slice(video.snippet.title, 32)}</h2>
									<div className='time'>
										<span>{date}</span>
										<span>{time}</span>
									</div>
								</div>

								<p className='body'>{slice(video.snippet.description, 400)}</p>

								<div className='services'>
									<span>dd</span>
									<span>dd</span>
									<span>dd</span>
									<span>dd</span>
								</div>
							</div>
							<div className='img'>
								<img src={video.snippet.thumbnails.standard.url} alt={video.snippet.title} />
							</div>
						</article>
					);
				})}
			</section>
			<section className='indexing'>
				<span>Prev</span>
				<div className='page'>
					<span>1</span>
					<span>2</span>
					<span>3</span>
					<span>4</span>
					<span>5</span>
				</div>
				<span>Next</span>
			</section>
		</Layout>
	);
}
