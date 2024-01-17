import './Branch.scss';

export default function Branch({ mapInfo, setIndex, Index }) {
	return (
		<nav className='Branch'>
			{mapInfo.current.map((el, idx) =>
				//prettier-ignore
				<button key={idx} onClick={() => setIndex(idx)} className={idx === Index ? 'on' : ''}>{el.title}</button>
			)}
		</nav>
	);
}
