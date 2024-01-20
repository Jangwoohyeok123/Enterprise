import React, { useEffect, useRef } from 'react';
import Layout from '../../common/layout/Layout';
import './Youtube.scss';
import { useQueryYoutube } from '../../../query/useQueryYoutube';
import Card from './comp/card/Card';

export default function Youtube() {
	// component 분리하기
	const path = useRef(process.env.PUBLIC_URL);
	const { data: Vids, isSuccess, isLoading, isError } = useQueryYoutube();

	return (
		<Layout
			title={'Youtube'}
			src={`${path.current}/img/youtube/main.jpg`}
			className='Youtube'>
			<section className='Youtube-Section'>
				<div className='header'>
					<h2>Working Videos</h2>
					<h3>Description</h3>
				</div>
				{isSuccess &&
					Vids.map((video, idx) => {
						return <Card video={video} idx={idx} />;
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
