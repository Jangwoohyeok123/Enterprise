import { createContext, useContext, useState } from 'react';

export const GlobalContext = createContext();

export function GlobalProvider({ children }) {
	const [OpenMenu, setOpenMenu] = useState(false);
	const [OpenModal, setOpenModal] = useState(false);
	const [Dark, setDark] = useState(false);

	return (
		<GlobalContext.Provider
			value={{ OpenMenu, setOpenMenu, OpenModal, setOpenModal, Dark, setDark }}>
			{children}
		</GlobalContext.Provider>
	);
}

// GlobalContext 안에 선언됐던 value 를 전달해주는 훅이다.
// 훅 사용자는 const {state, modifyFc} = useGlobalData();
export function useGlobalData() {
	const globalData = useContext(GlobalContext);
	return globalData;
}

/* 


*/
