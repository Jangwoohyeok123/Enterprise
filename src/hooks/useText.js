// text 관련한 함수 모음집
// type 은 목적의 유형을 의미함
// json 에 '-', '_' 등의 구분자가 있는 문자를 다룸 => 1
export default function useTextMethod(type) {
	if (type === 'combine') {
		return (txt, isUpper = true, separator = ' ') => {
			const resultTxt = txt
				.split(/-|_|\+/)
				.map(chunk => chunk.toUpperCase())
				.join(separator);

			return resultTxt;
		};
	}

	// json 에 '-', '_' 등의 구분자가 있는 문자를 다룸 => 2
	if (type === 'split') {
		return (txt, isUpper = true) => {
			const arr = txt.split(/-|_|\+|' '/);
			return isUpper ? arr.map(txt => txt.toUpperCase()) : arr;
		};
	}

	// 받아온 data 의 글자가 layout 을 벗어나 곤란할 때
	if (type === 'wordSlice') {
		// slice 할 txt 와 최종적으로 받고 싶은 글자 수
		return (txt, num) => {
			const result = txt.split(' ').slice(0, num).join(' ');
			return result;
		};
	}

	if (type === 'charSlice') {
		// slice 할 txt 와 최종적으로 받고 싶은 글자 수
		return (txt, num) => {
			const result = txt.slice(0, num);
			return result;
		};
	}

	if (type === 'shorten') {
		return (txt, len = 100) => {
			if (txt.length > len) {
				return txt.slice(0, len) + '...';
			} else {
				return txt;
			}
		};
	}
}
