import { createStore, applyMiddleware } from 'redux';
import reducers from './reducers/index';
import createSagaMiddleware from '@redux-saga/core';

const sagaMiddleware = createSagaMiddleware();
const store = createStore(reducers);
applyMiddleware(sagaMiddleware);
export default store;

// store 설치 및 saga middleware 설치
