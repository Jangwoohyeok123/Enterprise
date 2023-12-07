import useTextMethod from '../../../hooks/useText';
import { useViewType } from '../../../hooks/useViewType';
import Layout from '../../common/layout/Layout';
import './Youtube.scss';
import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { IoArrowForwardCircleOutline } from 'react-icons/io5';

export default function Youtube() {
	const [Vids, setVids] = useState([]);
	const [Title, setTitle] = useState('We provide a simplified build process');

	// custom hook
	const viewType = useViewType();
	const wordSlice = useTextMethod('wordSlice');
	const charSlice = useTextMethod('charSlice');

	const fetchYoutube = async () => {
		const api비밀키 = process.env.REACT_APP_YOUTUBE_API; // Cloud 에서 받아옴
		const 저장소이름 = process.env.REACT_APP_YOUTUBE_LIST; // youtube url 뒤에 있음
		const 요청사진개수 = 5;
		const 최종주소 = `https://www.googleapis.com/youtube/v3/playlistItems?key=${api비밀키}&part=snippet&playlistId=${저장소이름}&maxResults=${요청사진개수}`;
		const data = await fetch(최종주소);
		const json = await data.json();
		setVids(json.items); // 요청 함수
	};

	const path = useRef(process.env.PUBLIC_URL);

	// 줄세우기 함수
	useEffect(() => {
		fetchYoutube();
	}, []);

	return (
		<Layout title={Title} className='Youtube'>
			<section className='Youtube-firstSection'>
				<div className='leftImg'>
					<div className='text'>
						<div>Loremipsumdolor sitamet.</div>
						<div>Let's talk</div>
					</div>
					<div className='circle'>asum</div>
				</div>

				<div className='right'>
					<img src={`${path.current}/img/youtube/main.jpg`} alt='modern-house' />

					<div className='text'>
						<h2>Our Trusted Partners</h2>
						<p>
							Lorem ipsum dolor sit amet consectetur adipisicing elit. Veritatis ad molestias quis accusamus voluptates
							aperiam sint mollitia numquam at quidem vel tenetur, perspiciatis cum. Perspiciatis, possimus rem. Nulla,
							tempora facere?
						</p>
						<div className='partners'>
							<span>Crystoper</span>
							<span>Author</span>
							<span>Author</span>
							<span>Author</span>
							<span>Author Kirem</span>
							<span>Author</span>
							<span>CatDoru</span>
							<div className='card'>&ABDGO</div>
						</div>
					</div>
				</div>
			</section>
			<section className='Youtube-secondSection'>
				<div className='header'>
					<h2>Working Videos</h2>
					<h3>description</h3>
				</div>
				{Vids.map((video, idx) => {
					const [date, tmpTime] = video.snippet.publishedAt.split('T');
					const time = tmpTime.slice(0, tmpTime.length - 1);
					return (
						<article key={video + idx}>
							<div className='video'>
								<Link className='img' to={`/detail/${video.id}`}>
									<img src={video.snippet.thumbnails.standard.url} alt={video.snippet.title} />
								</Link>
								<div className='text'>
									<h4>{wordSlice(video.snippet.title)}</h4>
									<div className='sub'>
										<div className='time'>
											<span>{date}</span>
											<span>{time}</span>
										</div>
									</div>
								</div>
							</div>
							<div className='description'>
								<p>{charSlice(video.snippet.description, 190)} ...</p>
								<Link className='more' to={`/detail/${video.id}`}>
									<span>more</span>
									<IoArrowForwardCircleOutline className='icon' />
								</Link>
							</div>
						</article>
					);
				})}
			</section>
		</Layout>
	);
}

/* 
<section className='introduce'>
				We are ready <strong>5 projects</strong> videos for you
			</section>
			<section className='articles'>
				
			</section>

			const [date, tmpTime] = video.snippet.publishedAt.split('T');
			wordSlice(video.snippet.title, 5)
			wordSlice(video.snippet.description, 50)
			video.snippet.thumbnails.standard.url} alt={video.snippet.title}
*/
