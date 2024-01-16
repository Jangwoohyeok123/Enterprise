import { Link } from 'react-router-dom/cjs/react-router-dom.min';
import useTextMethod from '../../../../../hooks/useText';
import { IoLogoYoutube } from 'react-icons/io5';
import { MdPlayArrow } from 'react-icons/md';
import { SiYoutube } from 'react-icons/si';
import './Video.scss';
import { useEffect, useRef } from 'react';

export default function Video({ video }) {
	const wordSlice = useTextMethod('wordSlice');
	const [date, tmpTime] = video.snippet.publishedAt.split('T');
	const time = tmpTime.slice(0, tmpTime.length - 1);
	const RefvideoContainer = useRef(null);

	useEffect(() => {
		const videoContainers = document.querySelectorAll('.videoContainer');
		const playicons = document.querySelectorAll('.playicon');

		videoContainers.forEach((video, idx) => {
			video.addEventListener('mouseover', () => {
				playicons[idx].style.color = ' red';
			});
		});

		videoContainers.forEach((video, idx) => {
			video.addEventListener('mouseout', () => {
				playicons[idx].style.color = ' gray';
			});
		});
	}, []);

	return (
		<div className='Video'>
			<div className='videoContainer' ref={RefvideoContainer}>
				<Link className='videoImg' to={`/detail/${video.id}`}>
					<img
						src={video.snippet.thumbnails.standard.url}
						alt={video.snippet.title}
					/>
				</Link>
				<MdPlayArrow className='playicon' />
			</div>
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
