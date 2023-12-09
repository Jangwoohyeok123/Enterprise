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
	// imgClick 시 모달 에 전달할 프롭에 필요
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
									<article key={idx} layoutId={pic.owner}>
										<div className='txt'>
											<div className='services'>
												<div className='info'>
													<span>User id: </span>
													<span onClick={() => setUserGallery(pic.owner)}>{pic.owner}</span>
												</div>
												<IoArrowForwardCircleOutline className='more icons' onClick={() => setUserGallery(pic.owner)} />
											</div>
											<h3>
												{top}
												<br></br>
												{bottom.length ? bottom : 'Dream'}
											</h3>
										</div>

										<img
											onClick={() =>
												fullImgAnimation(
													pic.owner,
													`https://live.staticflickr.com/${pic.server}/${pic.id}_${pic.secret}_m.jpg`
												)
											}
											src={`https://live.staticflickr.com/${pic.server}/${pic.id}_${pic.secret}_m.jpg`}
											alt={`${pic.title}`}
										/>
									</article>
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
