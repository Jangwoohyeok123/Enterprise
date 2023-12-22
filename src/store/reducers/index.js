import { combineReducers } from 'redux';
import departmentReducer from './server/department';
import postsReducer from './server/posts';
import youtubeReducer from './server/youtube';
import flickrReducer from './server/flickr';
import darkReducer from './client/dark';
import menuReducer from './client/menu';
import modalReducer from './client/modal';

const reducers = combineReducers({
	// server
	departmentReducer,
	postsReducer,
	youtubeReducer,
	flickrReducer,
	// client
	darkReducer,
	menuReducer,
	modalReducer
});

export default reducers;

// 전역 state 를 관리할 리듀서 생성 및 파일 분리
