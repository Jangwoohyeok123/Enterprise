import { createContext, useContext, useState } from 'react';
import { useViewType } from './useViewType';

export const GlobalContext = createContext();

export function GlobalProvider({ children }) {
	const [OpenMenu, setOpenMenu] = useState(false);
	const [OpenModal, setOpenModal] = useState(false);
	const [Dark, setDark] = useState(false);
	const { ViewType, setViewType } = useViewType();

	return (
		<GlobalContext.Provider
			value={{
				ViewType,
				setViewType,
				OpenMenu,
				setOpenMenu,
				OpenModal,
				setOpenModal,
				Dark,
				setDark
			}}>
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
