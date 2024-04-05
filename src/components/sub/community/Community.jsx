import './Community.scss';
import Layout from '../../common/layout/Layout';
import { useEffect, useRef, useState } from 'react';
import { FiEdit3 } from 'react-icons/fi';
import { RiDeleteBinLine } from 'react-icons/ri';

export default function Community() {
	const [Posts, setPosts] = useState([]);
	const [IsEdit, setIsEdit] = useState(false);

	const path = useRef(process.env.PUBLIC_URL);
	const refTitle = useRef(null);
	const refBody = useRef(null);
	const refEditTitle = useRef(null);
	const refEditBody = useRef(null);
	const refCurUserId = useRef(null);

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
		const current = `${time.getFullYear()}-${
			time.getMonth() + 1
		}-${time.getDate()}`;

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

	const openEditMode = selectedIndex => {
		if (IsEdit) return;
		setIsEdit(!IsEdit);
		setPosts(
			Posts.map((post, idx) => {
				if (selectedIndex === idx) post.enableUpdate = true;
				else post.enableUpdate = false;

				return post;
			})
		);
	};

	const closeEditMode = selectedIndex => {
		setIsEdit(!IsEdit);

		setPosts(
			Posts.map((post, idx) => {
				const time = new Date();
				const current = `${time.getFullYear()}-${
					time.getMonth() + 1
				}-${time.getDate()}`;

				if (selectedIndex === idx) {
					return {
						title: refEditTitle.current.value,
						body: refEditBody.current.value,
						enableUpdate: false,
						userid: refCurUserId.current.innerText,
						time: '(latest) ' + current
					};
				}
				return post;
			})
		);
	};

	const deletePost = selectedIndex => {
		if (!window.confirm('해당 게시글을 삭제하겠습니까?')) return;
		setPosts(Posts.filter((_, idx) => idx !== selectedIndex));
	};

	useEffect(() => {
		fetchPosts();
	}, []);

	return (
		<Layout
			title={'Community'}
			className='Community'
			src={`${path.current}/movies/movie4.jpg`}>
			<section className='body'>
				<aside className='createPost'>
					<input type='text' placeholder='title' ref={refTitle} />
					<textarea
						cols='30'
						rows='5'
						placeholder='body'
						ref={refBody}></textarea>

					<nav>
						<button onClick={resetInput}>Reset</button>
						<button onClick={createPost}>Create</button>
					</nav>
				</aside>

				<div className='posts'>
					{Posts.map((post, idx) => {
						if (idx > 4) return null;
						if (post.enableUpdate) {
							return (
								<article key={idx} className='post'>
									<div className='posting'>
										<input
											type='text'
											defaultValue={post.title}
											ref={refEditTitle}
										/>
										<textarea
											cols='30'
											rows='4'
											defaultValue={post.body}
											ref={refEditBody}></textarea>
									</div>
									<div className='profile'>
										<div className='left'>
											<span>
												<strong>User id: </strong>
												<span ref={refCurUserId}>{post.userid}</span>
											</span>
										</div>
										<div className='right'>
											<span className='date'>Date: {post.time}</span>
											<span onClick={() => closeEditMode(idx)}>
												<FiEdit3 />
											</span>
											<span onClick={() => deletePost(idx)}>
												<RiDeleteBinLine />
											</span>
										</div>
									</div>
								</article>
							);
						} else {
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
											<span className='date'>Date: {post.time}</span>
											<span
												onClick={() => {
													openEditMode(idx);
												}}>
												<FiEdit3 />
											</span>
											<span onClick={() => deletePost(idx)}>
												<RiDeleteBinLine />
											</span>
										</div>
									</div>
								</article>
							);
						}
					})}
				</div>
			</section>
		</Layout>
	);
}

// return 문의 이벤트 핸들러는  state 의 변경을 담당하고
// state 변경시 다른 돔 요소를 제어하는 등의 다양한 로직들은 useEffect 에서 담당한다.

// Read Mode 일 때는 Read 모드 출력하기
// Edit Mode 일 때는 클릭한 post 만 edit 가능학세 만들기
