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
		dispatch({ type: TABLES.YOUTUBE.start });
		dispatch({ type: TABLES.FLICKR.start, opt: { type: 'interest' } });
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

/* redux-saga 파일에 에 관하여..

fetch 파일
=> action 객체를 인터셉트 한 후 saga 가 처리할 fetch 로직들을 담은 파일

reducers 파일
=> 전역 state 를 담당하는 reducer 들을 모아둔 파일 action 타입에 따라서 state 의 변경을 진행한다. 

sagas 파일 
=> component 가 dispatch 한 action 을 인터셉트 한 후 별도의 처리를 한 후 reducer 에게 스스로 만든 action 객체를 전달하는 역할을 함

actionTables 파일
=> action 들을 한 파일로 모아둠 컴포넌트나 리듀서는 이 파일을 보면서 dispatch 할 때, reducer 는 type 에 따른 작업을 정의할 때 보면서 작업하자

store 파일 
=> redux 전역 store 파일을 만드는 공간으로 Provider 이 파일에서 생성한 store 를 전달하면 App component 는 전역 state 를 useSelector 를 통해 사용가능하다.

*/

/* redux 관련 해야할 일 정리 

redux 를 다루면서 해야할 일은 일반 redux 는 
1. 전역 state 만들기
2. 전역 state 변경하기
3. 전역 state 불러오기

saga 는
1. 전역 state 만들기
2. 전역 state 변경하기
3. 전역 state 후처리 후 변경하기 (saga)
4. 전역 state 불러오기

정리하면,

=> 전역 state 만들기
1. reducer 만들기
2. action 만들기 
3. 비동기 state 라면 saga 를 이용하기 

=> 전역 state 사용하기 
useSelector(store => store.리듀서이름.state);

=> 전역 state 변경하기 
dispatch({ type: TABLES.DEPARTMENT.start })

*/
