import { useEffect, useRef, useState } from 'react';
import Masonry from 'react-masonry-component';
import Layout from '../../common/layout/Layout';
import './Gallery.scss';
import { IoArrowForwardCircleOutline, IoArrowBack } from 'react-icons/io5';
import useTextMethod from '../../../hooks/useText';
import Modal from '../../common/modal/Modal';
import { AnimatePresence, motion } from 'framer-motion';

export default function Gallery() {
	// useState
	const [Title, setTitle] = useState('Our users post creative and interesting photos on our app');
	const [Pics, setPics] = useState([]);
	const [OpenModal, setOpenModal] = useState(false);

	// useRef
	const userId = useRef('128267964@N02'); // user's gallery 에 필요
	const page = useRef(''); // page 이동시 필요한 ref
	// imgClick 시 모달 컴포넌트에 전달할 프롭에 필요
	const imgSrc = useRef('');
	const layoutId = useRef('');

	// useCustomHook
	const charSlice = useTextMethod('charSlice');

	// controller - 동기
	// setState 를 호출하면서 props 를 setting 하는 함수
	const fullImgAnimation = (clickedId, clickedImgSrc) => {
		layoutId.current = clickedId;
		imgSrc.current = clickedImgSrc;
		setOpenModal(true);
	};

	// controller - 비동기
	const setUserGallery = async (clickedId) => {
		if (clickedId === userId.current) return;
		userId.current = clickedId;
		page.current = 'user';
		const photos = await fetchFlickr({ type: 'user', id: userId.current });
		setPics(photos);
	};

	const setInterstGallery = async (e) => {
		// page 가 interest 면 fetch 안함
		if (page.current === 'interest') return;
		page.current = 'interest';
		console.log('interest');
		const photos = await fetchFlickr({ type: 'interest' });
		setPics(photos);
	};

	const fetchFlickr = async (opt) => {
		const num = 36;
		const flickr_api = process.env.REACT_APP_FLICKR_API;
		const baseURL = `https://www.flickr.com/services/rest/?&api_key=${flickr_api}&per_page=${num}&format=json&nojsoncallback=1&method=`;
		const method_interest = 'flickr.interestingness.getList';
		const method_user = 'flickr.people.getPhotos';
		const method_search = 'flickr.photos.search'; //search method 추가
		const interestURL = `${baseURL}${method_interest}`;
		const userURL = `${baseURL}${method_user}&user_id=${opt.id}`;
		const searchURL = `${baseURL}${method_search}&tags=${opt.keyword}`; //search url 추가
		let url = '';
		opt.type === 'user' && (url = userURL);
		opt.type === 'interest' && (url = interestURL);
		opt.type === 'search' && (url = searchURL);
		const data = await fetch(url);
		const json = await data.json();
		const photos = json.photos.photo;

		return photos;
	};

	useEffect(() => {
		setInterstGallery();
	}, []);

	return (
		<>
			<Layout title={Title} className='Gallery'>
				<section className='frameWrap'>
					<div className='back' onClick={setInterstGallery}>
						<IoArrowBack className='icons' />
						Return to Today's Gallery Rankings
					</div>
					<Masonry className={'frame'} options={{ transitionDuration: '0.5s', gutter: 20 }}>
						{Pics.map((pic, idx) => {
							const picTitle = pic.title.split(' ');
							const top = charSlice(picTitle.slice(0, picTitle.length / 2 + 1).join(''), 24);
							const bottom = charSlice(picTitle.slice(picTitle.length / 2 + 1).join(''), 24);

							return (
								<>
									<motion.article key={idx} layoutId={pic.owner}>
										<motion.div className='txt'>
											<motion.div className='services'>
												<motion.div className='info'>
													<motion.span>User id: </motion.span>
													<motion.span onClick={() => setUserGallery(pic.owner)}>{pic.owner}</motion.span>
												</motion.div>
												<IoArrowForwardCircleOutline className='more icons' onClick={() => setUserGallery(pic.owner)} />
											</motion.div>
											<motion.h3>
												{top}
												<br></br>
												{bottom.length ? bottom : 'Dream'}
											</motion.h3>
										</motion.div>

										<motion.img
											onClick={() =>
												fullImgAnimation(
													pic.owner,
													`https://live.staticflickr.com/${pic.server}/${pic.id}_${pic.secret}_m.jpg`
												)
											}
											src={`https://live.staticflickr.com/${pic.server}/${pic.id}_${pic.secret}_m.jpg`}
											alt={`${pic.title}`}
										/>
									</motion.article>
								</>
							);
						})}
					</Masonry>

					<Modal
						selectedId={layoutId.current}
						imgSrc={imgSrc.current}
						OpenModal={OpenModal}
						setOpenModal={setOpenModal}
					></Modal>
				</section>
			</Layout>
		</>
	);
}

/*
	순서1.일반 동적 데이터를 제외한 일반 정적인 컨텐츠가 렌더링됨 (참조객체에 20 상수값을 미리 담아놓음)
	순서2.정적인 JSX가 요소 일단은 브라우저에 렌더링완료되었기 때문에 useEffect실행가능해짐
	순서3.useEffect안쪽에서 미리 참조객체에 연결해놓은 refFrameWrap에 접근 가능 (이때 refFrameWrap에 --gap변수에 20이라는 값을 강제 적용 이때부터는 sass파일에 --gap이란 변수가 없더라도 리액트에서 동적으로 gap이라는 변수값을 넣었기 때문에 활용가능)
	순서4-리액트에 동적으로 변수값을 적용해서 돔을생성하고 나면 그 이후 scss가 해당 변수값을 읽어서 화면 스타일링


	순서1-처음에 gap이라는 참조객체값을 해석
	순서2-2번째 렌더링타임에 useEffect가 실행되면서 참조객체에 담겨있는 section요소에 강제로 gap변수값을 적용
	순서3-3번째 렌더링 타임에 fecthing데이터에 의한 동적 요소가 출력되면서 그때 비로서 변수값이 적용된 sass styling 적용 (paint)
*/

/* 
<Masonry className={'frame'} options={{ transitionDuration: '0.5s', gutter: gap.current }}>
						{Pics.length === 0 ? (
							<h2>해당 키워드에 대한 검색 결과가 없습니다.</h2>
						) : (
							Pics.map((pic, idx) => {
								return (
									<article key={pic.id}>
										<div
											className='pic'
											onClick={() => {
												setOpen(true);
												setIndex(idx);
											}}
										>
											<img
												src={`https://live.staticflickr.com/${pic.server}/${pic.id}_${pic.secret}_m.jpg`}
												alt={pic.title}
											/>
										</div>
										<h2>{pic.title}</h2>

										<div className='profile'>
											<img
												src={`http://farm${pic.farm}.staticflickr.com/${pic.server}/buddyicons/${pic.owner}.jpg`}
												alt='사용자 프로필 이미지'
												onError={(e) => e.target.setAttribute('src', 'https://www.flickr.com/images/buddyicon.gif')}
											/>
											<span onClick={handleUser}>{pic.owner}</span>
										</div>
									</article>
								);
							})
						)}
					</Masonry>


					
		  <Modal Open={Open} setOpen={setOpen}>
				{Pics.length !== 0 && (
					<img
						src={`https://live.staticflickr.com/${Pics[Index].server}/${Pics[Index].id}_${Pics[Index].secret}_b.jpg`}
						alt={Pics[Index].title}
					/>
				)}
			</Modal> 

*/
