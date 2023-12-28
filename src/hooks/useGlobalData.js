import { createContext, useContext, useState } from 'react';

export const GlobalContext = createContext();

export function GlobalProvider({ children }) {
	const [OpenMenu, setOpenMenu] = useState(false);
	const [OpenModal, setOpenModal] = useState(false);
	const [Dark, setDark] = useState(false);

	return (
		<GlobalContext.Provider value={{ OpenMenu, setOpenMenu, OpenModal, setOpenModal, Dark, setDark }}>
			{children}
		</GlobalContext.Provider>
	);
}

//useContext로 반환한 전체 전역데이터를 내보는 커스텀훅 생성후 export
export function useGlobalData() {
	const globalData = useContext(GlobalContext);
	return globalData;
}
