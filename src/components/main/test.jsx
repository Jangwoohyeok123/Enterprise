import './test.scss';

export default function test() {
	return 




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
  </div>;
}
