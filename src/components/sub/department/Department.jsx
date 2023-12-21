import { useEffect, useRef, useState } from 'react';
import './Department.scss';
import useTextMethod from '../../../hooks/useText';
import { useSelector } from 'react-redux';
import Layout from '../../common/layout/Layout';
import * as TABLES from '../../../store/actionTables';

export default function Department() {
	const json = useSelector(store => store.departmentReducer.department);
	// custom hook
	const splitHeader = useTextMethod('split');

	// ref
	const path = useRef(process.env.PUBLIC_URL);

	const ArticleData = json.article;
	const FeaturesData = json.article.features;
	const MembersData = json['norm-people'];
	const MembersTitle = splitHeader('norm-people', true);
	const TableHeader = json['our-awards'].header;
	const TableBody = json['our-awards'].body;
	const AwardsTitle = splitHeader('our-awards', true);

	return (
		<Layout className='Department' title={'NORM ARCHITECTS STUDIO WAS FOUNDED IN 2008'}>
			<section className='Department-firstSection'>
				<div className='header'>
					<img src={`${path.current}/img/department/${ArticleData.mainImg}`} alt='mainImage' />
				</div>
				<div className='body'>
					<h2>{ArticleData.subHeadline}</h2>
					<div>
						<p>{ArticleData.body}</p>
						<div className='cards'>
							{FeaturesData.map((feature, idx) => {
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
				{MembersTitle.map((title, idx) => {
					return <h3 key={title + idx}>{title}</h3>;
				})}
				<div className='container'>
					{MembersData.map((member, idx) => {
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
				{AwardsTitle.map((title, idx) => {
					return <h3 key={title + idx}>{title}</h3>;
				})}
				<div className='awards-table'>
					<thead>
						<tr>
							{TableHeader.map((col, idx) => {
								return <th key={col + idx}>{col}</th>;
							})}
						</tr>
					</thead>
					<tbody>
						{TableBody.map((row, idx) => {
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
		</Layout>
	);
}
