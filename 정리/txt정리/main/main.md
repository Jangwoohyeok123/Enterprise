## Layout

[handleScroll]
=> 현재 scroll 이 num 보다 크면 위로 이동하는 btn이 보이게 하는 핸들러다.

[useEffect_for_ScrollTo(0)]
=> 화면을 이동하면 맨 위로 이동한다.

[useEffect_for_handleScroll(300)]
=> 렌더링 이후 app 을 찾아서 handelScroll 을 적용시킨다.

## Pics

[특징변수]
thisEl: 컴포넌트의 최상위 요소
boxEl: parallax effect 를 적용할 요소

[handleScroll]
=> useScroll 을 통해서 갖고온 getCurrentScroll 함수를 이용해 scrollTop 을 갖고와서 scroll 이 발생할 때 마다 inline style 을 제어함으로서 애니메이션 효과를 부여한다.

=> n번째 section 에 위치한 boxEl 을 handling 한다.

=> n 번째 section 에 도착하면 translate 를 이용해서 animation 을 준다. (특정 섹션에서 parallax 적용)

[useEffect_for_setApp]  
=> app 을 갖고와서 렌더링이후에 state 로 만들기 위함

[useEffect_for_handleScroll]
=> state 로 저장된 app element 를 handleScroll(핸들링) 하기 위함

## Btns

[특징변수]
Num: Mainpage 의 section 개수
isAutoScroll: autoScroll 의 진행상황을 나타내는 변수
isMotion: moveScroll 의 진행상황을 나타내는 변수

[activation]
scroll: app 컴포넌트에서 스크롤이 일어난 정도

[moveScroll]

[autoScroll]

[modifyPos]

## useScroll

=> 전달한요소에서 발생하는 스크롤이벤트를 관리하는 객체를 생성하는 훅이다. (현재 app, pics section 에서 사용중)

=> scrollTop 의 위치를 갖고오거나 scroll 을 이동시키는 기능을 갖고 있는 객체를 반환한다.

=> 객체가 관리할 요소를 state 에 담아서 전달해야한다.

app component 에서 scroll 이 얼마나 진행됐는지 알려면 app.scrollTop 을 사용해라

[비트맵vs벡터]

    			<div className='txtBox'>
    				<ul>
    					{isSuccess &&
    						data.map((el, idx) => {
    							if (idx >= num.current) return null;

    							return (
    								<li key={el.id} className={idx === Index ? 'on' : ''}>
    									<h3>{trimTitle(el.snippet.title)}</h3>
    								</li>
    							);
    						})}
    				</ul>
    			</div>

    			<Swiper {...swiperOpt.current}>
    				{isSuccess &&
    					data.map((el, idx) => {
    						if (idx >= num.current) return null;
    						return (
    							/*
    							1. 두 개의 사진이 겹쳐보이게 css 처리한다.
    							2. SwiperSlide 의 자식요소들은 하나의 slide 단위로 처리된다.
    						*/
    							<SwiperSlide key={el.id} ref={test}>
    								<div className='pic'>
    									<p>
    										{/* blur */}
    										<img
    											src={el.snippet.thumbnails.standard.url}
    											alt={el.snippet.title}
    										/>
    									</p>
    									<p>
    										{/* 보이는 이미지 */}
    										<img
    											src={el.snippet.thumbnails.standard.url}
    											alt={el.snippet.title}
    										/>
    									</p>
    								</div>
    							</SwiperSlide>
    						);
    					})}
    			</Swiper>

    			<nav className='preview'>
    				{isSuccess && (
    					<>
    						<p
    							className='prevBox'
    							onClick={() => swipeRef.current.slidePrev(400)}>
    							<img
    								src={data[PrevIndex].snippet.thumbnails.default.url}
    								alt={data[PrevIndex].snippet.title}
    							/>
    						</p>
    						<p
    							className='nextBox'
    							onClick={() => swipeRef.current.slideNext(400)}>
    							<img
    								src={data[NextIndex].snippet.thumbnails.default.url}
    								alt={data[NextIndex].snippet.title}
    							/>
    						</p>
    					</>
    				)}
    			</nav>

    			<ul className='pagination'>
    				{Array(num.current)
    					.fill()
    					.map((_, idx) => {
    						return (
    							<li
    								key={idx}
    								className={idx === Index ? 'on' : ''}
    								onClick={() => swipeRef.current.slideToLoop(idx, 400)}></li>
    						);
    					})}
    			</ul>

    			<div className='barFrame'>
    				<p
    					className='bar'
    					style={{ width: (100 / num.current) * (Index + 1) + '%' }}></p>
    			</div>

    			<div className='counter'>
    				<strong>0{Index + 1}</strong>/<span>0{num.current}</span>
    			</div>
