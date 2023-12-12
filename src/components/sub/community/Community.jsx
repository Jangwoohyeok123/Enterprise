import './Community.scss';
import Layout from '../../common/layout/Layout';
import { useEffect, useRef, useState } from 'react';
import { FiEdit3 } from 'react-icons/fi';
import { RiDeleteBinLine } from 'react-icons/ri';

export default function Community() {
	// state
	const [Title, setTitle] = useState("User's Community");
	const [Posts, setPosts] = useState([]);

	// ref
	const path = useRef(process.env.PUBLIC_URL);
	const refTitle = useRef(null);
	const refBody = useRef(null);

	const fetchPosts = async () => {
		const data = await fetch(`${path.current}/DB/community.json`);
		const json = await data.json();
		json.posts.forEach(post => (post.enableUpdate = false));
		localStorage.setItem('posts', JSON.stringify(json.posts));
		setPosts(json.posts);
	};

	const resetInput = () => {
		refTitle.current.value = '';
		refBody.current.value = '';
	};

	const createPost = () => {
		const time = new Date();
		const current = `${time.getFullYear()}-${time.getMonth() + 1}-${time.getDate()}`;

		setPosts([
			{
				title: refTitle.current.value,
				body: refBody.current.value,
				enableUpdate: false,
				userid: '96229824@N06',
				time: current
			},
			...Posts
		]);
	};

	const editPost = editIndex => {
		setPosts(
			Posts.map((post, idx) => {
				if (editIndex === idx) post.enableUpdate = true;
				else post.enableUpdate = false;
			})
		);
	};

	const deletePost = deleteIndex => {
		setPosts(
			Posts.filter((_, idx) => {
				return idx !== deleteIndex;
			})
		);
	};

	useEffect(() => {
		fetchPosts();
	}, []);

	return (
		<Layout title={Title} className='Community'>
			<header>
				<div className='img'>
					<img src={`${path.current}/img/community/main.jpg`} alt='main image' />
				</div>
			</header>

			<section className='body'>
				<aside className='createPost'>
					<input type='text' placeholder='title' ref={refTitle} />
					<textarea cols='30' rows='5' placeholder='body' ref={refBody}></textarea>

					<nav>
						<button onClick={resetInput}>Reset</button>
						<button onClick={createPost}>Create</button>
					</nav>
				</aside>

				<div className='posts'>
					{Posts.map((post, idx) => {
						if (idx >= 4) return null;

						return (
							<article key={idx} className='post'>
								<div className='posting'>
									<h4>{post.title}</h4>
									<p>{post.body}</p>
								</div>
								<div className='profile'>
									<div className='left'>
										<span>
											<strong>User id: </strong>
											{post.userid}
										</span>
									</div>
									<div className='right'>
										<span>Date: {post.time}</span>
										<span onClick={() => editPost(idx)}>
											<FiEdit3 />
										</span>
										<span onClick={() => deletePost(idx)}>
											<RiDeleteBinLine />
										</span>
									</div>
								</div>
							</article>
						);
					})}
				</div>
			</section>
		</Layout>
	);
}

// return 문의 이벤트 핸들러는  state 의 변경을 담당하고
// state 변경시 다른 돔 요소를 제어하는 등의 다양한 로직들은 useEffect 에서 담당한다.
