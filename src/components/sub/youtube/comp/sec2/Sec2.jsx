import { Link } from 'react-router-dom/cjs/react-router-dom.min';
import useTextMethod from '../../../../../hooks/useText';
import { useQueryYoutube } from '../../../../../query/useQueryYoutube';
import './Sec2.scss';
import { IoArrowForwardCircleOutline } from 'react-icons/io5';
import Card from './card/Card';

export default function Sec2() {
	const { data: Vids, isSuccess } = useQueryYoutube();

	return (
		<section className='Youtube-secondSection'>
			<div className='header'>
				<h2>Working Videos</h2>
				<h3>Description</h3>
			</div>
			{isSuccess &&
				Vids.map((video, idx) => {
					return <Card video={video} idx={idx} />;
				})}
		</section>
	);
}
