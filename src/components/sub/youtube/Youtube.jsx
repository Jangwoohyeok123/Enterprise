import useTextMethod from '../../../hooks/useText';
import { useViewType } from '../../../hooks/useViewType';
import Layout from '../../common/layout/Layout';
import './Youtube.scss';
import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { IoArrowForwardCircleOutline } from 'react-icons/io5';
import { useQueryYoutube, useQueryYoutubeDetail } from '../../../query/useQueryYoutube';

export default function Youtube() {
	const { data: Vids, isSuccess } = useQueryYoutube();

	// custom hook
	const viewType = useViewType();
	const wordSlice = useTextMethod('wordSlice');
	const charSlice = useTextMethod('charSlice');

	const path = useRef(process.env.PUBLIC_URL);

	return (
		<Layout title={''} className='Youtube'>
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
					<h3>Description</h3>
				</div>
				{isSuccess &&
					Vids.map((video, idx) => {
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

/* 
  home 을 갔다가 Youtube 로 가면 문제가 없는데 youtube 로 바로가면 문제가 생김
*/
