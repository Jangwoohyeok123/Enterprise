import CLINET_TABLES from '../../actionTables/clientTable';

const darkReducer = (state = { dark: false }, action) => {
	if (action.type === CLINET_TABLES.DARK.start) return { ...state, dark: action.payload };
	else return state;
};

export default darkReducer;
