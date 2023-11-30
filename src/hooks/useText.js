export default function useTextMethod(type) {
	if (type === 'combine') {
		return (txt, isUpper = true, separator = ' ') => {
			const resultTxt = txt
				.split(/-|_|\+/)
				.map((chunk) => chunk.toUpperCase())
				.join(separator);

			return resultTxt;
		};
	}

	if (type === 'split') {
		return (txt, isUpper = true) => {
			const arr = txt.split(/-|_|\+|' '/);
			return isUpper ? arr.map((txt) => txt.toUpperCase()) : arr;
		};
	}

	// jsx return 에서 활용될 훅
	if (type === 'title') {
		return () => {};
	}
}
