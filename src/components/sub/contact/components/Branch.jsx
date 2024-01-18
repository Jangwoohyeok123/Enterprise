import './Branch.scss';

export default function Branch({ mapInfo, setIndex, Index }) {
	const colors = {
		seoul: '#007bff',
		naver: '#03c75a',
		kakao: '#ffcd00'
	};
	//colors[el.title]
	return (
		<nav className='Branch'>
			{mapInfo.current.map((el, idx) =>
				//prettier-ignore
				<button key={idx} onClick={() => setIndex(idx)} className={idx === Index ? 'on' : ''} style={ idx === Index ? {background: colors[el.title] } : {}}>{el.title}</button>
			)}
		</nav>
	);
}
