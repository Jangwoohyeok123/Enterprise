import './Card.scss';
import Description from '../description/Description';
import Video from '../video/Video';

export default function Card({ video, idx }) {
	return (
		<article className='Youtube-Card' key={video + idx}>
			<Video video={video} />
			<Description video={video} />
		</article>
	);
}
