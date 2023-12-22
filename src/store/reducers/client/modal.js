import * as TABLES from '../actionTables';

const modalReducer = (state = { modal: false }, action) => {
	if (action.type === TABLES.MODAL.start) return { ...state, modal: action.payload };
	else return state;
};
