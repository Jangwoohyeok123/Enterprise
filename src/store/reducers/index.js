import { combineReducers } from 'redux';
import * as TABLES from '../actionTables';
import departmentReducer from './department';
import postsReducer from './posts';

const reducers = combineReducers({ departmentReducer, postsReducer });

export default reducers;

// 전역 state 를 관리할 리듀서 생성 및 파일 분리
