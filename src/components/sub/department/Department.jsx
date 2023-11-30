import { useEffect, useRef, useState } from 'react';
import './Department.scss';
import useTextMethod from '../../../hooks/useText';

export default function Department() {
	// state
	const [ArticleData, setArticleData] = useState([]);
	const [FeaturesData, setFeaturesData] = useState([]);
	const [MembersData, setMembers] = useState([]);
	const [MembersTitle, setMembersTitle] = useState([]);
	const [AwardsData, setAwardsData] = useState([]);
	const [AwardsTitle, setAwardsTitle] = useState([]);

	// ref
	const path = useRef(process.env.PUBLIC_URL);
	// const AwardsTitleArr = useRef(AwardsTitle);

	// custom hook
	const splitHeader = useTextMethod('split');

	// fetch
	const departmentFetch = async () => {
		const dataSet = await fetch(`${path.current}/DB/department.json`);
		const json = await dataSet.json();

		setArticleData(json.article);
		setFeaturesData(json.article.features);
		setMembers(json['norm-people']);
		setMembersTitle(splitHeader('norm-people', true));
		setAwardsData(json['our-awards']);
		setAwardsTitle(splitHeader('our-awards', true));
	};

	useEffect(() => {
		departmentFetch();
	}, []);

	return (
		<main className='Department'>
			<section className='Department-firstSection'>
				<div className='header'>
					<h1>{ArticleData.headline}</h1>
					<img src={`${path.current}/img/${ArticleData.mainImg}`} alt='mainImage' />
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
								<img src={`${path.current}/img/${member.pic}`} alt='memberImage' />
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
					{/* <thead>
						<tr>
							<th>안녕</th>
							<th>col2</th>
							<th>col3</th>
							<th>colr3</th>
						</tr>
					</thead>
					<tbody>
						<tr>
							<td>22</td>
							<td>33</td>
							<td>44</td>
							<td>55</td>
						</tr>
					</tbody> */}
				</div>
			</section>
		</main>
	);
}
