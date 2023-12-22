import * as TABLES from '../actionTables';

export const darkReducer = (state = { dark: false }, action) => {
	if (action.type === TABLES.DARK.start) return { ...state, dark: action.payload };
	else return state;
};
