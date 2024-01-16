import { Link } from 'react-router-dom/cjs/react-router-dom.min';
import './Card.scss';
import { IoArrowForwardCircleOutline } from 'react-icons/io5';
import useTextMethod from '../../../../../../hooks/useText';
import Video from './Video';

export default function Card({ video, idx }) {
	const [date, tmpTime] = video.snippet.publishedAt.split('T');
	const time = tmpTime.slice(0, tmpTime.length - 1);
	// custom hook
	const wordSlice = useTextMethod('wordSlice');
	const charSlice = useTextMethod('charSlice');

	return (
		<article className='Youtube-Card' key={video + idx}>
			{/* <div className='video'>
				<Link className='img' to={`/detail/${video.id}`}>
					<img
						src={video.snippet.thumbnails.standard.url}
						alt={video.snippet.title}
					/>
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
			</div> */}
			<Video video={video} />
			<div className='description'>
				<p>{charSlice(video.snippet.description, 190)} ...</p>
				<Link className='more' to={`/detail/${video.id}`}>
					<span>more</span>
					<IoArrowForwardCircleOutline className='icon' />
				</Link>
			</div>
		</article>
	);
}
