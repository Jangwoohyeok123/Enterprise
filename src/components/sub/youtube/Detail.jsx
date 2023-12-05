import './Detail.scss';
import Layout from '../../common/layout/Layout';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';

// router 는 링크해주고 실행시켜주는 역할까지 함 app.jsx 참조
export default function Detail() {
	const [Title, setTitle] = useState('NORM ARCHITECTS STUDIO WAS FOUNDED IN 2008');
	const [Video, setVideo] = useState(null);
	const { id } = useParams(); // video.id 의 구조분해할당
	// Link 컴포넌트의 to 속성의 parameter 로 전달받은 값

	const fetchVideo = async () => {
		const api_key = process.env.REACT_APP_YOUTUBE_API;
		const baseURL = `https://www.googleapis.com/youtube/v3/playlistItems?key=${api_key}&part=snippet&id=${id}`;
		const data = await fetch(baseURL);
		const json = await data.json();
		console.log(json.items[0].snippet);
		setVideo(json.items[0].snippet);
	};

	useEffect(() => {
		fetchVideo();
	}, []);

	return (
		<Layout className='Detail' title={Title}>
			<figure>
				<div className='screen'>
					<iframe src={`https://www.youtube.com/embed/${Video.resourceId.videoId}`}></iframe>
				</div>
			</figure>
		</Layout>
	);
}
