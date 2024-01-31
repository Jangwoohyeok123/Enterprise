import useTextMethod from '../../../../../hooks/useText';
import './DepartmentSec1.scss';

export default function DepartmentSec1({ json }) {
	const paragraphSlice = useTextMethod('paragraphSlice');
	const paragraphs = paragraphSlice(json.article.body, 2);

	return (
		<section className='DepartmentSec1'>
			<div className='sec1Container'>
				<h2 className='left'>{json.article.subHeadline}</h2>
				<div className='right'>
					<div className='body'>
						{paragraphs.map(txt => {
							return <p className='paragraph'>{txt}</p>;
						})}
					</div>
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
