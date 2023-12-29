import { useEffect, useRef, useState } from 'react';
import Masonry from 'react-masonry-component';
import Layout from '../../common/layout/Layout';
import './Gallery.scss';
import { IoArrowForwardCircleOutline, IoArrowBack } from 'react-icons/io5';
import useTextMethod from '../../../hooks/useText';
import Modal from '../../common/modal/Modal';
import { useDispatch, useSelector } from 'react-redux';
import * as SERVER_TABLES from '../../../store/actionTables/serverTable';
import CLIENT_TABLES from '../../../store/actionTables/clientTable';

export default function Gallery({ viewType }) {
	console.log(viewType);
	const dispatch = useDispatch();
	const Pics = useSelector(store => store.flickrReducer.flickr);
	const [OpenModal, setOpenModal] = useState(false);
	const [Index, setIndex] = useState(0);

	// useRef
	const userId = useRef('128267964@N02'); // user's gallery 에 필요
	const page = useRef(''); // page 이동시 필요한 ref
	const path = process.env.PUBLIC_URL;

	// useCustomHook
	const charSlice = useTextMethod('charSlice');

	// controller - 동기
	// setState 를 호출하면서 props 를 setting 하는 함수
	// 마우스가 올라갔을 때 말풍선 보이기
	const notiOpen = e => {
		e.currentTarget.children[1].style.visibility = 'visible';
	};

	// 마우스가 내려갔을 때 말풍선 없애기
	const notiClose = e => {
		e.currentTarget.children[1].style.visibility = 'hidden';
	};

	// controller - 비동기
	// 클릭한 userId 로 전역 state 변경하기 및 화면 재렌더링
	const setUserGallery = async clickedId => {
		if (clickedId === userId.current) return;
		userId.current = clickedId;
		console.log(userId.current);
		page.current = 'user';
		dispatch({ type: SERVER_TABLES.FLICKR.start, opt: { type: 'user', id: userId.current } });
	};

	const setInterstGallery = async e => {
		// page 가 interest 면 fetch 안함
		if (page.current === 'interest') return;
		page.current = 'interest';
		dispatch({ type: SERVER_TABLES.FLICKR.start, opt: { type: 'interest' } });
	};

	return (
		<>
			{Pics && (
				<Layout title={''} className='Gallery'>
					{/* Pics[0] */}

					<section className='gridContainer'>
						<div className='bestImage'>
							<img src={`${path}/img/gallery/main.jpg`} alt='mainImage' />
							<span className='small-txt'>
								<strong>Loremics</strong> dolor
							</span>
							<span className='big-txt'>
								LOGO: USERS<br></br>GALLERYS
							</span>
						</div>
						<article className='fixedCard1 card'>
							<div className='user'>
								<span className='userid'>
									<strong>User id:</strong> {Pics[0].owner}
								</span>
								<IoArrowForwardCircleOutline
									className='more icons'
									onClick={e => {
										setUserGallery(Pics[0].owner);
									}}
								/>
							</div>
							<h3>{Pics[0].title}</h3>
							{/* 여기 */}
							<img
								onClick={() => {
									dispatch({ type: CLIENT_TABLES.MODAL.start, payload: true });
									setIndex(0);
								}}
								src={`https://live.staticflickr.com/${Pics[0].server}/${Pics[0].id}_${Pics[0].secret}_b.jpg`}
								alt='picture1'
							/>
						</article>
						<article className='fixedCard2 card'>
							<div className='user'>
								<span className='userid'>
									<strong>User id:</strong> {Pics[1].owner}
								</span>
								<IoArrowForwardCircleOutline
									className='more icons'
									onClick={e => {
										setUserGallery(Pics[1].owner);
									}}
								/>
							</div>
							<h3>{Pics[1].title}</h3>
							<img
								onClick={() => {
									dispatch({ type: CLIENT_TABLES.MODAL.start, payload: true });
									setIndex(1);
								}}
								src={`https://live.staticflickr.com/${Pics[1].server}/${Pics[1].id}_${Pics[1].secret}_b.jpg`}
								alt='picture2'
							/>
						</article>
					</section>

					<Masonry className={'cardFrame'} options={{ transitionDuration: '0.5s', gutter: 20 }}>
						{Pics.map((pic, idx) => {
							if (idx < 2) return;
							return (
								<article className='card'>
									<div className='user'>
										<span className='userid'>
											<strong>User id:</strong> {pic.owner}
										</span>
										<IoArrowForwardCircleOutline
											className='more icons'
											onClick={e => {
												setUserGallery(pic.owner);
											}}
										/>
									</div>
									<h3>{pic.title}</h3>
									<img
										onClick={() => {
											dispatch({ type: CLIENT_TABLES.MODAL.start, payload: true });
											setIndex(idx);
										}}
										src={`https://live.staticflickr.com/${pic.server}/${pic.id}_${pic.secret}_b.jpg`}
										alt='picture2'
									/>
								</article>
							);
						})}
					</Masonry>

					<Modal>
						{Pics.length !== 0 && (
							<img
								src={`https://live.staticflickr.com/${Pics[Index].server}/${Pics[Index].id}_${Pics[Index].secret}_b.jpg`}
								alt={Pics[Index].title}
							/>
						)}
					</Modal>
				</Layout>
			)}
		</>
	);
}

/* 					
<img
	src={`https://live.staticflickr.com/${Pics[Index].server}/${Pics[Index].id}_${Pics[Index].secret}_b.jpg`}
	alt={Pics[Index].title}
/>
*/

// 레이아웃 제약조건
// mainLayout, subLayout 은 반복되면 안됨
// Pics.map 이 생산하는 jsx 는 아래와 같음
/* 
	1. Best image 
	2. height fixed card
	2. height variable card
*/

// pic 을 활용한 img tag
/* 
	<div className='imgBox'>
	  <img src={`https://live.staticflickr.com/${pic.server}/${pic.id}_${pic.secret}_m.jpg`} alt='' />
	</div>
*/

/* 

					<Masonry options={{ transitionDuration: '0.5s', gutter: 20 }}>
						<div className='mainLayout'>
							

						</div>
					</Masonry>

					<Masonry className={'subLayout'} options={{ transitionDuration: '0.5s', gutter: 20 }}>
						{Pics.map((pic, idx) => {
							if (idx > 2) return <></>; // index 가 3 이상일 경우 subLayout 에 표현한다.
						})}
					</Masonry>
*/

/* 
										// fixed image
										<article className='card'>
											<div className='services'>
												<div className='userid'>
													<span>User id: </span>
													<span onClick={() => setUserGallery(pic.owner)}>{pic.owner}</span>
												</div>
												<IoArrowForwardCircleOutline
													className='more icons'
													onClick={e => {
														setUserGallery(pic.owner);
													}}
												/>
											</div>
											<h3>{pic.title}</h3>
											<div className='imgBox'>
												<img src={`https://live.staticflickr.com/${pic.server}/${pic.id}_${pic.secret}_m.jpg`} alt='' />
											</div>
										</article>


*/

/* 


					<div className='back' onClick={setInterstGallery}>
						<IoArrowBack className='icons' />
						Return to Today's interest Gallery
					</div>
	<Masonry className={'frame'} options={{ transitionDuration: '0.5s', gutter: 20 }}>
						{Pics.map((pic, idx) => {
							const picTitle = pic.title.split(' ');
							const top = charSlice(picTitle.slice(0, picTitle.length / 2 + 1).join(''), 24);
							const bottom = charSlice(picTitle.slice(picTitle.length / 2 + 1).join(''), 24);

							return (
								<article key={idx}>
									<div className='txt'>
										<div className='services'>
											<div className='info'>
												<span>User id: </span>
												<span onClick={() => setUserGallery(pic.owner)}>{pic.owner}</span>
											</div>
											<div className='more' onMouseOver={notiOpen} onMouseOut={notiClose}>
												<IoArrowForwardCircleOutline
													className='more icons'
													onClick={e => {
														setUserGallery(pic.owner);
													}}
												/>
												<div className='noti'>{pic.owner}'s gallery</div>
											</div>
										</div>
										<h3>
											{top}
											<br></br>
											{bottom.length ? bottom : 'Dream'}
										</h3>
									</div>

									<img
										src={`https://live.staticflickr.com/${pic.server}/${pic.id}_${pic.secret}_m.jpg`}
										alt={`${pic.title}`}
										onClick={() => {
											setOpenModal(true);
											setIndex(idx);
										}}
									/>
								</article>
							);
						})}
					</Masonry>



*/
