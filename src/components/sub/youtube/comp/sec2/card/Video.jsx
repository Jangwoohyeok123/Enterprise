import { Link } from 'react-router-dom/cjs/react-router-dom.min';
import useTextMethod from '../../../../../../hooks/useText';
import './Video.scss';

export default function Video({ video }) {
	const wordSlice = useTextMethod('wordSlice');
	const [date, tmpTime] = video.snippet.publishedAt.split('T');
	const time = tmpTime.slice(0, tmpTime.length - 1);

	return (
		<div className='Video'>
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
		</div>
	);
}
