import CLINET_TABLES from '../../actionTables/clientTable';

const modalReducer = (state = { modal: false }, action) => {
	if (action.type === CLINET_TABLES.MODAL.start) return { ...state, modal: action.payload };
	else return state;
};

export default modalReducer;
