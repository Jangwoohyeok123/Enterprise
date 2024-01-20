import './DepartmentSec1.scss';

export default function DepartmentSec1({ json }) {
	return (
		<section className='DepartmentSec1'>
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
	);
}
