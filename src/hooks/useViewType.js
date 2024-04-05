import { useEffect, useState } from 'react';

export const useViewType = opt => {
	const defOpt = { mobile: 640, tablet: 1050, laptop: 1400 };
	const result = { ...defOpt, ...opt };
	const [ViewType, setViewType] = useState('');

	const getClientWid = () => {
		let wid = window.innerWidth;
		if (wid >= result.laptop) setViewType('');
		else if (wid >= result.tablet && wid < result.laptop)
			setViewType('Notebook');
		else if (wid >= result.mobile && wid < result.tablet) setViewType('Tablet');
		else if (wid >= 0 && wid < result.mobile) setViewType('Mobile');
	};

	useEffect(() => {
		getClientWid();
		window.addEventListener('resize', getClientWid);
		return () => window.removeEventListener('resize', getClientWid);
	}, []);

	return { ViewType, setViewType };
};
