import * as SERVER_TABLES from '../../actionTables/serverTable';

// department 전역변수에 관한 reducer
const departmentReducer = (state = { department: {} }, action) => {
	if (action.type === SERVER_TABLES.DEPARTMENT.start) return state;
	else if (action.type === SERVER_TABLES.DEPARTMENT.full) return { ...state, department: action.payload };
	else if (action.type === SERVER_TABLES.DEPARTMENT.rej) return { ...state, department: action.payload };
	else return state;
};

export default departmentReducer;
