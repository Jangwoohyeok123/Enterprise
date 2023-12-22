import * as TABLES from '../../actionTables';

// department 전역변수에 관한 reducer
const departmentReducer = (state = { department: {} }, action) => {
	if (action.type === TABLES.DEPARTMENT.start) return state;
	else if (action.type === TABLES.DEPARTMENT.full) return { ...state, department: action.payload };
	else if (action.type === TABLES.DEPARTMENT.rej) return { ...state, department: action.payload };
	else return state;
};

export default departmentReducer;
