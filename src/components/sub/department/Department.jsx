import { useEffect, useRef, useState } from 'react';
import './Department.scss';

export default function Department() {
	// state
	const [ArticleData, setArticleData] = useState([]);
	const [FeaturesData, setFeaturesData] = useState([]);
	const [MembersTitle, setMembersTitle] = useState('');
	const [Members, setMembers] = useState([]);

	// ref
	const path = useRef(process.env.PUBLIC_URL);
	useEffect(() => {
		fetch(`${path.current}/DB/department.json`)
			.then((data) => data.json())
			.then((json) => {
				setArticleData(json.article);
				setFeaturesData(json.article.features);
				setMembers(json.normPeople);
				setMembersTitle(Object.keys(json)[0]);
			});
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
				<h2>{MembersTitle}</h2> {/* js 처리 */}
				<div className='container'>
					{Members.map((member, idx) => {
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
		</main>
	);
}
