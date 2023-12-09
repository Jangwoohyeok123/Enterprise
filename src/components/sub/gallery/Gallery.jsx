import { useEffect, useRef, useState } from 'react';
import Masonry from 'react-masonry-component';
import Layout from '../../common/layout/Layout';
import './Gallery.scss';
import { IoArrowForwardCircleOutline, IoArrowBack } from 'react-icons/io5';
import useTextMethod from '../../../hooks/useText';
import Modal from '../../common/modal/Modal';

export default function Gallery() {
	// useState
	const [Title, setTitle] = useState('Our users post creative and interesting photos on our app');
	const [Pics, setPics] = useState([]);
	const [OpenModal, setOpenModal] = useState(false);
	const [Dx, setDx] = useState(0);
	const [Dy, setDy] = useState(0);

	// useRef
	const userId = useRef('128267964@N02'); // user's gallery 에 필요
	const page = useRef(''); // page 이동시 필요한 ref

	// imgClick 시 모달 에 전달할 프롭에 필요
	// const [imgSrc, setimgSrc] = useState('');
	// const [layoutId, setlayoutId] = useState('');
	// 시간되면 state 로 바꿔라
	const initX = useRef(0);
	const initY = useRef(0);
	const dx = useRef(0);
	const dy = useRef(0);
	const imgSrc = useRef('');
	const layoutId = useRef('');

	const test = useRef('');
	const 이미지클릭하면애니메이션 = (e) => {
		dx.current = window.innerWidth / 3 - e.currentTarget.getBoundingClientRect().left;
		dy.current = window.innerHeight / 5 - e.currentTarget.getBoundingClientRect().top;
		initX.current = e.currentTarget.getBoundingClientRect().left;
		initY.current = e.currentTarget.getBoundingClientRect().top;

		console.log(dx.current);
		console.log(dy.current);
		setOpenModal(true);
	};

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
								<article key={idx} layoutid={pic.owner}>
									<div className='txt'>
										<div className='services'>
											<div className='info'>
												<span>User id: </span>
												<span onClick={() => setUserGallery(pic.owner)}>{pic.owner}</span>
											</div>
											<IoArrowForwardCircleOutline
												className='more icons'
												onClick={(e) => {
													setUserGallery(pic.owner);
												}}
											/>
										</div>
										<h3>
											{top}
											<br></br>
											{bottom.length ? bottom : 'Dream'}
										</h3>
									</div>

									<img
										onClick={(e) => {
											fullImgAnimation(
												pic.owner,
												`https://live.staticflickr.com/${pic.server}/${pic.id}_${pic.secret}_m.jpg`
											);
											이미지클릭하면애니메이션(e);
										}}
										src={`https://live.staticflickr.com/${pic.server}/${pic.id}_${pic.secret}_m.jpg`}
										alt={`${pic.title}`}
										ref={test}
									/>
								</article>
							);
						})}
					</Masonry>

					{/* 이벤트가 발생할 때 전달할 속성은 state 로 처리한다. */}
					<Modal
						selectedId={layoutId.current}
						imgSrc={imgSrc.current}
						initX={initX.current}
						initY={initY.current}
						dx={dx.current}
						dy={dy.current}
						OpenModal={OpenModal}
						setOpenModal={setOpenModal}
					></Modal>
				</section>
			</Layout>
		</>
	);
}
