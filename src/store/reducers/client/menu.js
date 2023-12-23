import CLINET_TABLES from '../../actionTables/clientTable';

const menuReducer = (state = { menu: false }, action) => {
	if (action.type === CLINET_TABLES.MENU.start) return { ...state, menu: action.payload };
	else return state;
};

export default menuReducer;
