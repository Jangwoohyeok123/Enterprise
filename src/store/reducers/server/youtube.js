import * as TABLES from '../../actionTables';

// department 전역변수에 관한 reducer
const youtubeReducer = (state = { youtube: {} }, action) => {
	if (action.type === TABLES.YOUTUBE.start) return state;
	else if (action.type === TABLES.YOUTUBE.full) return { ...state, youtube: action.payload };
	else if (action.type === TABLES.YOUTUBE.rej) return { ...state, youtube: action.payload };
	else return state;
};

export default youtubeReducer;
