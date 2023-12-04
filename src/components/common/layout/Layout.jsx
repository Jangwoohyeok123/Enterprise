import './Layout.scss';

// children 은 앞에다만 써야함
export default function Layout({ children, title, className }) {
	return (
		<main className={className}>
			<h1>{title}</h1>
			{children}
		</main>
	);
}
