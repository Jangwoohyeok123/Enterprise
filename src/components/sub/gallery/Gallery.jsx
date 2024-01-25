import { useEffect, useRef, useState } from 'react';
import Masonry from 'react-masonry-component';
import Layout from '../../common/layout/Layout';
import './Gallery.scss';
import { IoArrowForwardCircleOutline, IoArrowBack } from 'react-icons/io5';
import useTextMethod from '../../../hooks/useText';
import Modal from '../../common/modal/Modal';
import { FaSearch } from 'react-icons/fa';
import { useQueryGallery } from '../../../query/useQueryGallery';
import { useViewType } from '../../../hooks/useViewType';
import Tab from './comp/Tab/Tab';

export default function Gallery() {
	const [Opt, setOpt] = useState({ type: 'interest' });
	const { data: Pics, isSuccess, error, isError } = useQueryGallery(Opt); // Opt 는 setOpt 가 변경될 때 마다 바뀔 거고 쿼리키가 바뀔때마다 리액트는 캐싱할 것임

	if (isError) alert('fetching 된 데이터가 없다.'); // 나중에 처리하자

	// useState
	const [Title, setTitle] = useState(
		'Our users post creative and interesting photos on our app'
	);
	const [OpenModal, setOpenModal] = useState(false);
	const [Index, setIndex] = useState(0); // for Modal

	// useRef
	const userId = useRef('128267964@N02'); // user's gallery 에 필요
	const tab = useRef('');
	// const searchInput = useRef('');
	const viewType = useViewType();

	const txtSlice = useTextMethod('wordSlice');

	// controller - 동기
	// setState 를 호출하면서 props 를 setting 하는 함수
	const activation = clickedIdx => {
		const btns = Array.from(tab.current.children);
		// useRef 를 통해서 관리되는 값은 state 가 변경돼도 달라지지 않는다.
		btns.forEach(btn => btn.classList.remove('on'));
		btns[clickedIdx].classList.add('on');
	};

	const notiOpen = e => {
		e.currentTarget.children[1].style.visibility = 'visible';
	};

	const notiClose = e => {
		e.currentTarget.children[1].style.visibility = 'hidden';
	};

	useEffect(() => {
		tab.current.children[0].classList.add('on');
	}, []);

	const path = useRef(process.env.PUBLIC_URL);

	return (
		<>
			{viewType === 'Mobile' && (
				<span className='menu' ref={tab}>
					<span
						onClick={() => {
							activation(0);
							setOpt({ type: 'interest' });
						}}>
						Interest Gallery
					</span>
					<span
						onClick={() => {
							activation(1);
							setOpt({ type: 'user', id: userId.current });
						}}>
						My Gallery
					</span>
				</span>
			)}
			<Layout
				title={'Gallery'}
				className='Gallery'
				src={`${path.current}/movies/movie3.jpg`}>
				<section className='frameWrap'>
					<Tab
						tab={tab}
						activation={activation}
						setOpt={setOpt}
						userId={userId}
					/>
					<Masonry
						className={'frame'}
						options={{ transitionDuration: '0.5s', gutter: 20 }}>
						{isSuccess &&
							Pics.map((pic, idx) => {
								console.log(Pics);
								let picTitle = pic.title;
								if (pic.title.length > 50)
									picTitle = picTitle.slice(0, 50).concat('...');

								return (
									<article key={idx}>
										<div className='txt'>
											<div className='services'>
												<div className='info'>
													<span>User id: </span>
													<span
														onClick={
															() => setOpt({ type: 'user', id: pic.owner })
															// 여기 수정해라 !! 클릭하면 tab 메뉴 초기화
														}>
														{pic.owner}
													</span>
												</div>
												<div
													className='more'
													onMouseOver={notiOpen}
													onMouseOut={notiClose}>
													<IoArrowForwardCircleOutline
														className='more icons'
														onClick={e =>
															setOpt({ type: 'user', id: pic.owner })
														}
													/>
													<div className='noti'>{pic.owner}'s gallery</div>
												</div>
											</div>
											<h3>{txtSlice(picTitle, 5)}</h3>
										</div>

										<div className='img'>
											<img
												src={`https://live.staticflickr.com/${pic.server}/${pic.id}_${pic.secret}_m.jpg`}
												alt={`${pic.title}`}
												onClick={() => {
													setOpenModal(true);
													setIndex(idx);
												}}
											/>
											<div className='overlay'></div>
										</div>
									</article>
								);
							})}
					</Masonry>
				</section>

				<Modal OpenModal={OpenModal} setOpenModal={setOpenModal}>
					{isSuccess && (
						<img
							src={`https://live.staticflickr.com/${Pics[Index].server}/${Pics[Index].id}_${Pics[Index].secret}_b.jpg`}
							alt={Pics[Index].title}
						/>
					)}
				</Modal>
			</Layout>
		</>
	);
}

/* 
[ Controls ]

Interest Gallery 를 누르면 handleInterest

My Gallery 를 누르면 handleMine

controls > form 을 누르면 handleSearch 실행

handleInterest
=> activateBtn 호출
=> flickr interest fetching

handleMine 
=> activateBtn 호출
=> flickr user fetching

handleSearch 
=> activateBtn 호출
=> flickr search fetching
=> search.current true 처리

[ search.current ]

서칭이 성공하고, 데이터를 갖고
리액트 쿼리에서 isSuccess 를 사용하면 필요없다.
*/
