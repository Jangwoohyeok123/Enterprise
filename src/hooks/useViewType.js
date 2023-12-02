import { useEffect, useState } from 'react';

export const useViewType = (mobile = 640, tablet = 1050, notebook = 1400) => {
	const [Type, setType] = useState('');

	const changeType = () => {
		let curWidth = window.innerWidth;

		if (curWidth >= 0 && curWidth < mobile) setType('Mobile');
		else if (curWidth >= mobile && curWidth < tablet) setType('Tablet');
		else if (curWidth >= tablet && curWidth < notebook) setType('Notebook');
		else setType('');
	};

	useEffect(() => {
		window.addEventListener('resize', changeType);
		return () => window.removeEventListener('resize', changeType);
	}, []);

	return Type;
};
