import { useRef } from 'react';
import useTextMethod from '../../../../../hooks/useText';
import './DepartmentSec2.scss';

export default function DepartmentSec2({ json }) {
	const splitHeader = useTextMethod('split');
	const path = useRef(process.env.PUBLIC_URL);

	return (
		<section className='DepartmentSec2'>
			{splitHeader('norm-people', true).map((title, idx) => {
				return <h3 key={title + idx}>{title}</h3>;
			})}
			<div className='container'>
				{json['norm-people'].map((member, idx) => {
					return (
						<div className='card' key={member + idx}>
							<img
								src={`${path.current}/img/department/${member.pic}`}
								alt='memberImage'
							/>
							<div className='text'>
								<h5>{member.name}</h5>
								<p>{member.position}</p>
							</div>
						</div>
					);
				})}
			</div>
		</section>
	);
}
