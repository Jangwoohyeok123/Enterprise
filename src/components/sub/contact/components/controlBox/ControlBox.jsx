import Branch from '../branch/Branch';
import './ControlBox.scss';
import Info from '../info/Info';

export default function ControlBox({
	mapInfo,
	setIndex,
	Index,
	Traffic,
	setTraffic,
	View,
	setView,
	setCenter
}) {
	return (
		<div className='ControlBox'>
			<Branch mapInfo={mapInfo} setIndex={setIndex} Index={Index} />
			<Info
				Traffic={Traffic}
				setTraffic={setTraffic}
				View={View}
				setView={setView}
				setCenter={setCenter}
			/>
		</div>
	);
}
