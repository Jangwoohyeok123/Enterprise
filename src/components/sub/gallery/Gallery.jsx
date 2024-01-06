import { useEffect, useRef, useState } from 'react';
import Masonry from 'react-masonry-component';
import Layout from '../../common/layout/Layout';
import './Gallery.scss';
import { IoArrowForwardCircleOutline, IoArrowBack } from 'react-icons/io5';
import useTextMethod from '../../../hooks/useText';
import Modal from '../../common/modal/Modal';
import { FaSearch } from 'react-icons/fa';
import { useQueryGallery } from '../../../query/useQueryGallery';

export default function Gallery() {
	const [Opt, setOpt] = useState({ type: 'interest' });
	const {
		data: Pics,
		isSuccess,
		refetch
	} = useQueryGallery({ type: 'interest' });

	// useState
	const [Title, setTitle] = useState(
		'Our users post creative and interesting photos on our app'
	);
	// const [Pics, setPics] = useState([]);
	const [OpenModal, setOpenModal] = useState(false);
	const [Index, setIndex] = useState(0);

	// useRef
	const userId = useRef('128267964@N02'); // user's gallery 에 필요
	const page = useRef(''); // page 이동시 필요한 ref
	const tab = useRef('');
	const searchInput = useRef('');

	// controller - 동기
	// setState 를 호출하면서 props 를 setting 하는 함수
	const activation = clickedIdx => {
		const btns = Array.from(tab.current.children);
		btns.forEach(btn => btn.classList.remove('on'));
		btns[clickedIdx].classList.add('on');

		// Array.from(tab.current.children).forEach(el => {
		// 	el.classList.remove('on');
		// });
		// Array.from(tab.current.children).forEach((menu, index) => {
		// 	if (index === clickedIdx && index === 0) {
		// 		menu.classList.add('on');
		// 		console.log('interest');
		// 		setPics(interest.photos.photo);
		// 	}
		// 	if (index === clickedIdx && index === 1) {
		// 		menu.classList.add('on');
		// 		console.log('my gallery');
		// 		setPics(myGallery.photos.photo);
		// 	}
		// });
	};

	const notiOpen = e => {
		e.currentTarget.children[1].style.visibility = 'visible';
	};

	const notiClose = e => {
		e.currentTarget.children[1].style.visibility = 'hidden';
	};

	// controller - 비동기
	const setUserGallery = async clickedId => {
		if (clickedId === userId.current) return;
		userId.current = clickedId;
		page.current = 'user';
		const photos = await fetchFlickr({ type: 'user', id: userId.current });
	};

	// btn-1
	const setInterstGallery = async e => {
		// // page 가 interest 면 fetch 안함
		// console.log('setInterest Gallery');
		// if (page.current === 'interest') return;
		// page.current = 'interest';
		// const photos = await fetchFlickr({ type: 'interest' });
		// caching data 가 있으면 cache 데이터를 쓰고 caching 이 되지 않으면 fetching 하고
	};

	// btn-2

	// search
	const handleSearch = e => {
		e.preventDefault();
		// fetching 한 다음 setting post 해야함
	};

	const fetchFlickr = async opt => {
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

	return (
		<>
			<Layout title={Title} className='Gallery'>
				<section className='frameWrap'>
					<div className='tab'>
						<span className='menu' ref={tab}>
							<span
								onClick={() => {
									activation(0);
									setInterstGallery();
								}}>
								Interest Gallery
							</span>
							<span
								onClick={() => {
									activation(1);
								}}>
								My Gallery
							</span>
						</span>

						<form className='search' onSubmit={handleSearch}>
							<input type='text' placeholder='Search' ref={searchInput}></input>
							<FaSearch className='icon' onClick={handleSearch} />
						</form>
					</div>
					<Masonry
						className={'frame'}
						options={{ transitionDuration: '0.5s', gutter: 20 }}>
						{isSuccess &&
							Pics.map((pic, idx) => {
								let picTitle = pic.title;
								if (pic.title.length > 50)
									picTitle = picTitle.slice(0, 50).concat('...');

								return (
									<article key={idx}>
										<div className='txt'>
											<div className='services'>
												<div className='info'>
													<span>User id: </span>
													<span onClick={() => setUserGallery(pic.owner)}>
														{pic.owner}
													</span>
												</div>
												<div
													className='more'
													onMouseOver={notiOpen}
													onMouseOut={notiClose}>
													<IoArrowForwardCircleOutline
														className='more icons'
														onClick={e => {
															setUserGallery(pic.owner);
														}}
													/>
													<div className='noti'>{pic.owner}'s gallery</div>
												</div>
											</div>
											<h3>{picTitle}</h3>
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
