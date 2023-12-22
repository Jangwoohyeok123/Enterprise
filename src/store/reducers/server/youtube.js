import * as SERVER_TABLES from '../../actionTables/serverTable';

// department 전역변수에 관한 reducer
const youtubeReducer = (state = { youtube: {} }, action) => {
	if (action.type === SERVER_TABLES.YOUTUBE.start) return state;
	else if (action.type === SERVER_TABLES.YOUTUBE.full) return { ...state, youtube: action.payload };
	else if (action.type === SERVER_TABLES.YOUTUBE.rej) return { ...state, youtube: action.payload };
	else return state;
};

export default youtubeReducer;
