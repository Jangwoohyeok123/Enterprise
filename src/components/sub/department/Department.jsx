import './Department.scss';
import { useRef } from 'react';
import Layout from '../../common/layout/Layout';
import { useQueryDepartment } from '../../../query/useQueryDepartment';
import DepartmentSec1 from './component/departmentSec1/DepartmentSec1';
import DepartmentSec2 from './component/departmentSec2/DepartmentSec2';
import DepartmentSec3 from './component/departmentSec3/DepartmentSec3';

export default function Department() {
	const { data: json, isSuccess: isDepartment } = useQueryDepartment();
	const path = useRef(process.env.PUBLIC_URL);

	return (
		<Layout
			className='Department'
			title={'DEPARTMENT'}
			src={`${path.current}/movies/movie1.jpg`}>
			{isDepartment && (
				<>
					<DepartmentSec1 json={json} />
					<DepartmentSec2 json={json} />
					<DepartmentSec3 json={json} />
				</>
			)}
		</Layout>
	);
}
