import { Link } from 'react-router-dom/cjs/react-router-dom.min';
import useTextMethod from '../../../../../hooks/useText';
import { useQueryYoutube } from '../../../../../query/useQueryYoutube';
import './Sec2.scss';
import { IoArrowForwardCircleOutline } from 'react-icons/io5';

export default function Sec2() {
	const { data: Vids, isSuccess } = useQueryYoutube();

	// custom hook
	const wordSlice = useTextMethod('wordSlice');
	const charSlice = useTextMethod('charSlice');

	return (
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
	);
}
