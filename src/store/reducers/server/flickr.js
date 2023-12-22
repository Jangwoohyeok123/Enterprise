import * as SERVER_TABLES from '../../actionTables/serverTable';

// department 전역변수에 관한 reducer
const flickrReducer = (state = { flickr: {} }, action) => {
	if (action.type === SERVER_TABLES.FLICKR.start) return state;
	else if (action.type === SERVER_TABLES.FLICKR.full) return { ...state, flickr: action.payload };
	else if (action.type === SERVER_TABLES.FLICKR.rej) return { ...state, flickr: action.payload };
	else return state;
};

export default flickrReducer;
