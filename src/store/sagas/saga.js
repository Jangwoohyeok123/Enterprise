import { takeLatest, call, put, fork, all } from 'redux-saga/effects';
import { fetchCommunity, fetchDepartment } from './fetch';
import * as TABLES from '../actionTables';

// function* callDepartment() {
//   yield takeLatest(TABLES.)
// }

export default function* rootSaga() {
	yield all([fork()]);
}

/* saga 함수 정리 
// all 은 병렬호출을 의미
// fork 는 비동기 호출을 의미함
// 

*/

// rootsaga 와 일반 saga 의 차이
