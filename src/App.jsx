import { Route } from 'react-router-dom';
import Footer from './components/common/footer/Footer';
import Header from './components/common/header/Header';
import Department from './components/sub/department/Department';

export default function App() {
	return (
		<div className='App'>
			<Header />
			<Route exact path='/department' component={Department} />
			<Footer />
		</div>
	);
}
