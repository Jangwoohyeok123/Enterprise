import './Layout.scss';

export default function Layout({ title, children }) {
	return (
		<main>
			<h1>{title}</h1>
			{children}
		</main>
	);
}
