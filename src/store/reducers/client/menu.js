import * as TABLES from '../actionTables';

const menuReducer = (state = { menu: false }, action) => {
	if (action.type === TABLES.MENU.start) return { ...state, menu: action.payload };
	else return state;
};
