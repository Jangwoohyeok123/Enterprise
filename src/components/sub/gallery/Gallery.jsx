import { useEffect, useRef, useState } from 'react';
import Masonry from 'react-masonry-component';
import Layout from '../../common/layout/Layout';
import './Gallery.scss';
import { IoArrowForwardCircleOutline, IoArrowBack } from 'react-icons/io5';
import useTextMethod from '../../../hooks/useText';
import Modal from '../../common/modal/Modal';
import { useDispatch, useSelector } from 'react-redux';
import * as SERVER_TABLES from '../../../store/actionTables/serverTable';

export default function Gallery() {
	const dispatch = useDispatch();
	const Pics = useSelector(store => store.flickrReducer.flickr);
	// useState
	// const [Pics, setPics] = useState([]);
	const [OpenModal, setOpenModal] = useState(false);
	const [Index, setIndex] = useState(0);

	// useRef
	const userId = useRef('128267964@N02'); // user's gallery 에 필요
	const page = useRef(''); // page 이동시 필요한 ref

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
	// 클릭한 userId 로 전역 state 변경하기 및 화면 재 렌더링
	const setUserGallery = async clickedId => {
		if (clickedId === userId.current) return;
		userId.current = clickedId;
		page.current = 'user';
		// const photos = await fetchFlickr({ type: 'user', id: userId.current });
		dispatch({ type: SERVER_TABLES.FLICKR.start, opt: { type: 'user', id: userId.current } });
	};

	// 클릭시 interest 로 돌아가기 'Return to Today's interest gallery' 를 말함
	const setInterstGallery = async e => {
		// page 가 interest 면 fetch 안함
		if (page.current === 'interest') return;
		page.current = 'interest';
		// dispatch 하면 알아서 비동기 호출함
		// const photos = await fetchFlickr({ type: 'interest' });
		// setPics(photos);
		dispatch({ type: SERVER_TABLES.FLICKR.start, opt: { type: 'interest' } });
	};

	return (
		<>
			<Layout title={'GALLERY'} className='Gallery'>
				<section className='frameWrap'>{/* 이벤트가 발생할 때 전달할 속성은 state 로 처리한다. */}</section>
				<Modal OpenModal={OpenModal} setOpenModal={setOpenModal}>
					{Pics.length !== 0 && (
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
