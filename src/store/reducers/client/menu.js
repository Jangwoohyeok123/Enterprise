import CLIENT_TABLES from '../../actionTables/clientTable';

const menuReducer = (state = { open: false }, action) => {
	if (action.type === CLIENT_TABLES.MENU.open) return { ...state, open: action.payload };
	else return state;
};

export default menuReducer;
