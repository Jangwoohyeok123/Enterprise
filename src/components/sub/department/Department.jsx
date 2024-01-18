import { useEffect, useRef, useState } from 'react';
import './Department.scss';
import useTextMethod from '../../../hooks/useText';
import { useQueryDepartment } from '../../../query/useQueryDepartment';
import Layout from '../../common/layout/Layout';
import DepartmentSec3 from './component/departmentSec3/Sec3';

export default function Department() {
	const { data: json, isSuccess: isDepartment } = useQueryDepartment();
	const path = useRef(process.env.PUBLIC_URL);
	const splitHeader = useTextMethod('split');

	return (
		<Layout
			className='Department'
			title={'DEPARTMENT'}
			src={`${path.current}/img/temps/temp1.jpg`}>
			{isDepartment && (
				<>
					<section className='Department-firstSection'>
						<div className='body'>
							<h2>{json.article.subHeadline}</h2>
							<div>
								<p>{json.article.body}</p>
								<div className='cards'>
									{json.article.features.map((feature, idx) => {
										return (
											<div className='card' key={feature + idx}>
												<h4>{feature.header}</h4>
												<p>{feature.body}</p>
											</div>
										);
									})}
								</div>
							</div>
						</div>
					</section>
					<section className='Department-secondSection'>
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
					<DepartmentSec3 json={json} />
				</>
			)}
		</Layout>
	);
}
