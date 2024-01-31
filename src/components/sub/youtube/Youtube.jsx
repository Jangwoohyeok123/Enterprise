import React, { useRef } from 'react';
import Layout from '../../common/layout/Layout';
import './Youtube.scss';
import { useQueryYoutube } from '../../../query/useQueryYoutube';
import Card from './comp/card/Card';

export default function Youtube() {
	// component 분리하기
	const path = useRef(process.env.PUBLIC_URL);
	const { data: Vids, isSuccess } = useQueryYoutube();

	return (
		<Layout
			title={'Youtube'}
			src={`${path.current}/movies/movie2.jpg`}
			className='Youtube'>
			<section className='Youtube-Section'>
				{isSuccess &&
					Vids.map((video, idx) => {
						return <Card video={video} idx={idx} />;
					})}
			</section>
		</Layout>
	);
}
