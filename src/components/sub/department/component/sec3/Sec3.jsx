import useTextMethod from '../../../../../hooks/useText';
import './Sec3.scss';

export default function Sec3({ json }) {
	const splitHeader = useTextMethod('split');

	return (
		<section className='Sec3'>
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
	);
}
