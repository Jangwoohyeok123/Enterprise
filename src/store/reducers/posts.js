import * as TABLES from '../actions/actionTables';

const postsReducer = (state = { posts: [] }, action) => {
	if (action.type === TABLES.POSTS.start) return state;
	else if (action.type === TABLES.POSTS.full) return { ...state, posts: action.payload };
	else if (action.type === TABLES.POSTS.rej) return { ...state, posts: action.payload };
};

export default postsReducer;
