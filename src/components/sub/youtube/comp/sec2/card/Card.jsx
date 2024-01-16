import Description from './Description';
import Video from './Video';
import './Card.scss';

export default function Card({ video, idx }) {
	return (
		<article className='Youtube-Card' key={video + idx}>
			<Video video={video} />
			<Description video={video} />
		</article>
	);
}
