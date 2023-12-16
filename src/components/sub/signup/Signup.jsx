import Layout from '../../common/layout/Layout';
import './Members.scss';

export default function Signup() {
	return (
		<Layout className='Signup'>
			<div className='container'>
				<h1>Registration</h1>
				<form>
					<label>Full Name</label>
					<input type='text' placeholder='Chrison hurfman' />
					<label>Username</label>
					<input type='text' placeholder='@huf.com' />
					<label>Email</label>
					<input type='text' placeholder='user_email@gmail.com' />
					<label>Phone Number</label>
					<input type='text' />
				</form>
			</div>
		</Layout>
	);
}
