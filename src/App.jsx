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
import { useViewType } from './hooks/useViewType';
import Detail from './components/sub/youtube/Detail';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import CookieModal from './components/common/cookieModal/CookieModal';
import { useCookie } from './hooks/useCookie';
import { useGlobalData } from './hooks/useGlobalData';
import { useLocation } from 'react-router-dom/cjs/react-router-dom.min';
import Menu from './components/common/menu/Menu';
import ScrollKey from './components/common/scrollKey/ScrollKey';

export default function App() {
	const { Dark, ViewType } = useGlobalData();
	const queryClient = new QueryClient();
	const { createCookie } = useCookie();
	const location = useLocation();

	// App 컴포넌트가 실행되면 dark 쿠키를 만든다.
	createCookie('dark', '', 60 * 60);

	return (
		<QueryClientProvider client={queryClient}>
			<div className={`App ${Dark ? 'dark' : ''} ${ViewType} `}>
				<Header />
				<Route exact path='/' component={MainWrap} />
				<Route path='/department' component={Department} />
				<Route path='/youtube' component={Youtube} />
				<Route path='/gallery' component={Gallery} />
				<Route path='/community' component={Community} />
				<Route path='/signup' component={Signup} />
				<Route path='/contact' component={Contact} />
				<Route path='/detail/:id' component={Detail} />
				<Footer />
				<Menu />
				<CookieModal wid={300} ht={400} />
			</div>
			<ScrollKey />
			<ReactQueryDevtools />
		</QueryClientProvider>
	);
}

// main 에서 scroll 없애고 싶으면

/* 
${
	location.pathname === '/' && 'main'
}
*/
