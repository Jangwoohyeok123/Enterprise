import { takeLatest, call, put, fork, all } from 'redux-saga/effects';
import { fetchCommunity, fetchDepartment, fetchYoutube, fetchFlickr } from '../fetch/fetch';
import * as TABLES from '../actionTables';

// saga 를 만들떄는 actionTable.js 를 보면서 작업해라
// component, reducer 작업도 actionTable.js 를 보면서 작업해라

function* callDepartment() {
	yield takeLatest(TABLES.DEPARTMENT.start, function* () {
		try {
			const resJson = yield call(fetchDepartment);
			// 패칭이 성공하면 새로운 action 객체를 만들고 reducer 에게 put함
			// 추후에 편의를 위해 resJson 을 쪼개서 보내고 싶으면 payload 를 손볼 것
			yield put({ type: TABLES.DEPARTMENT.full, payload: resJson });
		} catch (err) {
			yield put({ type: TABLES.DEPARTMENT.ref, payload: err });
		}
	});
}

function* callYoutube() {
	yield takeLatest(TABLES.YOUTUBE.start, function* () {
		try {
			// fetchYoutube 는 반환받은 json 에서 item 들을 반환한다.
			const json = yield call(fetchYoutube);
			// fetchYoutube 가 반환하는 데이터를 payload 에 넣어주기만 하면됨
			yield put({ type: TABLES.YOUTUBE.full, payload: json });
		} catch (err) {
			yield put({ type: TABLES.YOUTUBE.rej, payload: err });
		}
	});
}

function* callFlickr() {
	//
	yield takeLatest(TABLES.FLICKR.start, function* (action) {
		try {
			const json = yield call(fetchFlickr, action.opt);
			yield put({ type: TABLES.FLICKR.full, payload: json });
		} catch (err) {
			yield put({ type: TABLES.FLICKR.rej, payload: err });
		}
	});
}

function* callPosts() {
	yield takeLatest(TABLES.POSTS.start, function* () {
		try {
			const resPosts = yield call(fetchCommunity);
			yield put({ type: TABLES.POSTS.full, payload: resPosts.posts });
		} catch (err) {
			yield put({ type: TABLES.POSTS.rej, payload: err });
		}
	});
}

export default function* rootSaga() {
	yield all([fork(callDepartment), fork(callPosts), fork(callYoutube), fork(callFlickr)]);
}

/* saga 함수 정리 
// all 은 병렬호출을 의미
// fork 는 비동기 호출을 의미함
// takeLatest 호출이 중복되면 마지막 호출만 함 

*/

// rootsaga 와 일반 saga 의 차이
