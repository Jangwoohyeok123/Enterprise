import { Route } from 'react-router-dom';
import Footer from './components/common/footer/Footer';
import Header from './components/common/header/Header';
import MainWrap from './components/main/mainWrap/MainWrap';
import Signup from './components/sub/signup/Signup';
import Community from './components/sub/community/Community';
import Contact from './components/sub/contact/Contact';
import Department from './components/sub/department/Department';
import Gallery from './components/sub/gallery/Gallery';
import Youtube from './components/sub/youtube/Youtube';
import './globalStyles/Reset.scss';
import './globalStyles/Variable.scss';
import { useEffect, useState } from 'react';
import { useViewType } from './hooks/useViewType';
import Detail from './components/sub/youtube/Detail';
import { useDispatch } from 'react-redux';
import * as TABLES from './store/actionTables';

export default function App() {
	const dispatch = useDispatch();
	const [Dark, setDark] = useState(false);
	const viewType = useViewType();

	useEffect(() => {
		dispatch({ type: TABLES.DEPARTMENT.start });
		dispatch({ type: TABLES.POSTS.start });
	}, [dispatch]);

	return (
		<div className={`App ${Dark ? 'dark' : ''} ${viewType}`}>
			<Header Dark={Dark} setDark={setDark} viewType={viewType} />
			<Route exact path='/' component={MainWrap} />
			<Route path='/department' component={Department} />
			<Route path='/youtube' component={Youtube} />
			<Route path='/gallery' component={Gallery} />
			<Route path='/community' component={Community} />
			<Route path='/contact' component={Contact} />
			<Route path='/detail/:id' component={Detail} />
			<Route path='/signup' component={Signup} />
			<Footer viewType={viewType} />
		</div>
	);
}
//signup page 에서는
