import { useEffect, useRef, useState } from 'react';
import './Partners.scss';

export default function Partners() {
	const pointer = useRef(null);
	const [Youtubers, setYoutubers] = useState([
		'Crystoper',
		'Author',
		'Kim lim',
		'Alexander',
		'Author Kirem',
		'Soap people',
		'Hizacky'
	]);

	// 부모를 찾는 방법은 parentElement
	// Partners 에서 span list 만들기
	// click span 에 on 붙이기
	const move = (e, idx) => {
    // Nodelist
		const spanList2 = e.target.parentElement.querySelectorAll('span');

    // list 
		const spanList = Array.from(
			e.target.parentElement.querySelectorAll('span')
		);

		console.log(spanList2);
		console.log(spanList);
		spanList.map((span, idx) => {
			span.classList.remove('on');
		});

		console.log(spanList[idx].classList.add('on'));
		// spanList[idx].classList.add('on');
	};

	return (
		<div className='Partners'>
			{Youtubers.map((youtuber, idx) => {
				return (
					<span key={idx} onClick={e => move(e, idx)}>
						{youtuber}
					</span>
				);
			})}

			<div className='card' ref={pointer}>
				&ABDGO
			</div>
		</div>
	);
}
// 클릭할 때마다

/* 
	const targetPosition = e.target.offsetTop - 25;
	console.log(targetPosition);
	pointer.current.style.top = targetPosition + 'px';
	e.target.style.fontWeight = 600;
*/
