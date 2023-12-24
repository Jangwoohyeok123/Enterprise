const CLIENT_TABLES = {
	VIEWTYPE: {
		Notebook: 'Notebook',
		Tablet: 'Tablet',
		Mobile: 'Mobile'
	},

	MODAL: {
		start: 'MODAL_START'
	},

	MENU: {
		open: 'MENU_START'
	},

	DARK: {
		start: 'DARK_START'
	}
};

export default CLIENT_TABLES;

// 자동완성 안되는거 너무 힘들다...
// 컴포넌트에서 또는 리듀서에서 사용할 때 import CLIENT_TABLE.MODAL.start 형식으로 사용하면서 import 는 쉽게 만들어보자.
