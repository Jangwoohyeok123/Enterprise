import './Maps.scss';

export default function Maps({ mapFrame, viewFrame, View }) {
	return (
		<section className='Maps'>
			<article
				className={`mapBox ${View ? '' : 'on'}`}
				ref={mapFrame}></article>
			<article
				className={`viewBox ${View ? 'on' : ''}`}
				ref={viewFrame}></article>
		</section>
	);
}
