import './Layout.scss';

// children 은 앞에다만 써야함
export default function Layout({ children, title, className }) {
	return (
		<main className={className}>
			<h1 className='title'>{title}</h1>
			{children}
		</main>
	);
}

// setTimeout 안에 참조객체 optional chaining 됐는지 확인하기
