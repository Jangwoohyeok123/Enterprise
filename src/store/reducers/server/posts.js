import * as SERVER_TABLES from '../../actionTables/serverTable';

const postsReducer = (state = { posts: [] }, action) => {
	if (action.type === SERVER_TABLES.POSTS.start) return state;
	else if (action.type === SERVER_TABLES.POSTS.full) return { ...state, posts: action.payload };
	else if (action.type === SERVER_TABLES.POSTS.rej) return { ...state, posts: action.payload };
	else return state;
};

export default postsReducer;
