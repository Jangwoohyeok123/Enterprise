import { combineReducers } from 'redux';
import * as TABLES from '../actions/actionTables';
// import departmentReducer from './department';
// import postsReducer from './posts';

const departmentReducer = (state = { department: {} }, action) => {
	if (action.type === TABLES.DEPARTMENT.start) return state;
	else if (action.type === TABLES.DEPARTMENT.full) return { ...state, department: action.payload };
	else if (action.type === TABLES.DEPARTMENT.rej) return { ...state, department: action.payload };
};

const postsReducer = (state = { posts: [] }, action) => {
	if (action.type === TABLES.POSTS.start) return state;
	else if (action.type === TABLES.POSTS.full) return { ...state, posts: action.payload };
	else if (action.type === TABLES.POSTS.rej) return { ...state, posts: action.payload };
};

const reducers = combineReducers({ departmentReducer, postsReducer });
export default reducers;

// 전역 state 를 관리할 리듀서 생성 및 파일 분리
