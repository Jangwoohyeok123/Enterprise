import './Image.scss';

export default function Image({
	width = '100%',
	height = '100%',
	src,
	className
}) {
	return (
		<div
			className={`Image ${className}`}
			style={{ width: width, height: height }}>
			<img src={`${src}`} alt='img' />
		</div>
	);
}
