import { combineReducers } from 'redux';
import departmentReducer from './server/department';
import postsReducer from './server/posts';
import youtubeReducer from './server/youtube';
import flickrReducer from './server/flickr';

const reducers = combineReducers({ departmentReducer, postsReducer, youtubeReducer, flickrReducer });

export default reducers;

// 전역 state 를 관리할 리듀서 생성 및 파일 분리
