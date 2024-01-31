// text 관련한 함수 모음집
// type 은 목적의 유형을 의미함
export default function useTextMethod(type) {
	// json 에 '-', '_' 등의 구분자가 있는 문자를 다룸 => 1
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

	// txt 가 layout 을 벗어나 곤란할 때 단어단위로 자르기
	if (type === 'wordSlice') {
		// slice 할 txt 와 최종적으로 받고 싶은 글자 수
		return (txt, num) => {
			const result = txt.trim().split(' ').slice(0, num).join(' ');
			return result;
		};
	}

	// txt 가 layout 을 벗어나 곤란할 때 character 단위로 자르기
	if (type === 'charSlice') {
		// slice 할 txt 와 최종적으로 받고 싶은 글자 수
		return (txt, num) => {
			const result = txt.slice(0, num);
			return result;
		};
	}

	if (type === 'paragraphSlice') {
		return (txt, num) => {
			const paragraphUnit = Math.floor(txt.split(' ').length / num);
			// console.log(txt.split(' ').slice(0, 70).join());
			const paragraphs = new Array(num);

			// 반복문 문제인데 ....
			for (let i = 0; i < num; i++) {
				// console.log(txt); x
				// console.log(txt.split(' ').slice(0, 70));
				paragraphs[i] = txt
					.split(' ')
					.slice(i * paragraphUnit, (i + 1) * paragraphUnit);
			}

			return paragraphs.map((p, idx) => {
				return p.join(' ');
			});
		};
	}
}

/* 문단 나누기 알고리즘  

num 개의 paragraph 를 만들어준다.

*/
