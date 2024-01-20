import './DepartmentSec1.scss';

export default function DepartmentSec1({ json }) {
	return (
		<section className='DepartmentSec1'>
			<div className='sec1Container'>
				<h2 className='left'>{json.article.subHeadline}</h2>
				<div className='right'>
					<p className='body'>{json.article.body}</p>
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
