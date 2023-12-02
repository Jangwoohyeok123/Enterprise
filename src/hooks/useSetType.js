import { useEffect, useState } from 'react';

export const useViewType = (mobile = 640, tablet = 1000, notebook = 1400) => {
	const [Type, setType] = useState('');

	const changeType = () => {
		let curWidth = window.innerWidth;
		console.log(curWidth);

		if (curWidth >= 0 && curWidth < mobile) setType('mobile');
		else if (curWidth >= mobile && curWidth < tablet) setType('tablet');
		else if (curWidth >= tablet && curWidth < notebook) setType('notebook');
		else setType('');
	};

	useEffect(() => {
		window.addEventListener('resize', changeType);
		return () => window.removeEventListener('resize', changeType);
	}, []);

	return Type;
};
