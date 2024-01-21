import './Info.scss';

export default function Info({
	Traffic,
	setTraffic,
	View,
	setView,
	setCenter
}) {
	return (
		<nav className='Info'>
			<button onClick={() => setTraffic(!Traffic)}>
				{Traffic ? 'Traffic OFF' : 'Traffic ON'}
			</button>
			<button onClick={() => setView(!View)}>
				{View ? 'map' : 'road view'}
			</button>
			<button onClick={setCenter}>위치 초기화</button>
		</nav>
	);
}
