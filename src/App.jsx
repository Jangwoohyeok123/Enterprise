import { Route } from 'react-router-dom';
import Footer from './components/common/footer/Footer';
import Header from './components/common/header/Header';
import MainWrap from './components/main/mainWrap/MainWrap';
import Members from './components/sub/members/Members';
import Community from './components/sub/community/Community';
import Contact from './components/sub/contact/Contact';
import Department from './components/sub/department/Department';
import Gallery from './components/sub/gallery/Gallery';
import Youtube from './components/sub/youtube/Youtube';
import './globalStyles/Reset.scss';
import './globalStyles/Variable.scss';
import { useState } from 'react';
import { useViewType } from './hooks/useViewType';

export default function App() {
	const [Dark, setDark] = useState(false);
	const [Toggle, setToggle] = useState(false);
	const viewType = useViewType();

	return (
		<div className={`App ${Dark ? 'dark' : ''} ${viewType}`}>
			<Header Dark={Dark} setDark={setDark} viewType={viewType} />
			<Route exact path='/' component={MainWrap} />
			<Route path='/department' component={Department} />
			<Route path='/youtube' component={Youtube} />
			<Route path='/gallery' component={Gallery} />
			<Route path='/community' component={Community} />
			<Route path='/members' component={Members} />
			<Route path='/contact' component={Contact} />
			<Footer />
		</div>
	);
}
