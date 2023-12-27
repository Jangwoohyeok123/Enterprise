import { useEffect, useRef, useState } from 'react';
import './Department.scss';
import useTextMethod from '../../../hooks/useText';
import { useQueryDepartment } from '../../../query/useQueryDepartment';
import Layout from '../../common/layout/Layout';

export default function Department() {
	const { data: json, isSuccess: isDepartment } = useQueryDepartment();
	const path = useRef(process.env.PUBLIC_URL);
	const splitHeader = useTextMethod('split');

	return (
		<Layout className='Department' title={'NORM ARCHITECTS STUDIO WAS FOUNDED IN 2008'}>
			{isDepartment && (
				<>
					<section className='Department-firstSection'>
						<div className='header'>
							<img src={`${path.current}/img/department/${json.article.mainImg}`} alt='mainImage' />
						</div>
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
										<img src={`${path.current}/img/department/${member.pic}`} alt='memberImage' />
										<div className='text'>
											<h5>{member.name}</h5>
											<p>{member.position}</p>
										</div>
									</div>
								);
							})}
						</div>
					</section>
					<section className='Department-thirdSection'>
						{splitHeader('our-awards', true).map((title, idx) => {
							return <h3 key={title + idx}>{title}</h3>;
						})}
						<div className='awards-table'>
							<thead>
								<tr>
									{json['our-awards'].header.map((col, idx) => {
										return <th key={col + idx}>{col}</th>;
									})}
								</tr>
							</thead>
							<tbody>
								{json['our-awards'].body.map((row, idx) => {
									return (
										<tr key={row + idx}>
											{row.map((data, idx) => {
												return <td key={data + idx}>{data}</td>;
											})}
										</tr>
									);
								})}
							</tbody>
						</div>
					</section>
				</>
			)}
		</Layout>
	);
}
