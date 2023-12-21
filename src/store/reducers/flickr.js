import * as TABLES from '../actionTables';

// department 전역변수에 관한 reducer
const flickrReducer = (state = { flickr: {} }, action) => {
	if (action.type === TABLES.FLICKR.start) return state;
	else if (action.type === TABLES.FLICKR.full) return { ...state, flickr: action.payload };
	else if (action.type === TABLES.FLICKR.rej) return { ...state, flickr: action.payload };
	else return state;
};

export default flickrReducer;
