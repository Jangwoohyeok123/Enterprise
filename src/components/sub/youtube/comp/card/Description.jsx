import { Link } from 'react-router-dom/cjs/react-router-dom.min';
import { IoArrowForwardCircleOutline } from 'react-icons/io5';
import useTextMethod from '../../../../../hooks/useText';
import './Description.scss';

export default function Description({ video }) {
	const charSlice = useTextMethod('charSlice');

	return (
		<div className='description'>
			<p>{charSlice(video.snippet.description, 190)} ...</p>
			<Link className='more' to={`/detail/${video.id}`}>
				<IoArrowForwardCircleOutline className='icon' />
			</Link>
		</div>
	);
}
