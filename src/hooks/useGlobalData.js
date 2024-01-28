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

export function useGlobalData() {
	const globalData = useContext(GlobalContext);
	return globalData;
}

// GlobalContext 안에 선언됐던 value 를 전달해주는 훅이다.
// 훅 사용자는 const {state, modifyFc} = useGlobalData();

/* 
	context API 는 아래의 과정이 필요하다.

	1. createContext 호출 
	2. 전역 state 선언
	3. provider 에게 전달

	[ 사용법 ]

	useContext 를 통해 provider 에게 전달할 데이터를 받아서 사용할 수 있다.
	ex) const 전역데이터 =  useContext(GlobalContext); // Context 도 여러개 선언할 수 있음 

*/
