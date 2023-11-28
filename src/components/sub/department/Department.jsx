import { useEffect, useRef, useState } from 'react';
import './Department.scss';

export default function Department() {
	const [ArticleData, setArticleData] = useState([]);
	const [FeaturesData, setFeaturesData] = useState([]);
	const [Members, setMembers] = useState([]);

	const path = useRef(process.env.PUBLIC_URL);
	useEffect(() => {
		fetch(`${path.current}/DB/department.json`)
			.then((data) => data.json())
			.then((json) => {
				console.log(json);
				setArticleData(json.article);
				setFeaturesData(json.article.features);
				setMembers(json.normPeople);
			});
	}, []);

	return (
		<main className='Department'>
			<section className='Department-first'>
				<div className='header'>
					<h1>{ArticleData.headline}</h1>
					<img src={`${path.current}/img/${ArticleData.mainImg}`} alt='mainImage' />
				</div>
				<div className='body'>
					<h2>{ArticleData.subHeadline}</h2>
					<div>
						<p>{ArticleData.body}</p>
						<div class='cards'>
							{FeaturesData.map((feature) => {
								return (
									<div className='card'>
										<h4>${feature.header}</h4>
										<p>${feature.body}</p>
									</div>
								);
							})}
						</div>
					</div>
				</div>
			</section>
			<section className='Department-second'></section>
		</main>
	);
}
