## Swiper Config

    const swiperOpt = useRef({
    	modules: [Autoplay],
    	loop: true,
    	slidesPerView: 1,
    	spaceBetween: 50,
    	centeredSlides: true,
    	loopedSlides: num.current,
    	onSwiper: swiper => {
    		swipeRef.current = swiper;
    	},
    	onSlideChange: swiper => {
    		setIndex(swiper.realIndex);
    		swiper.realIndex === 0
    			? setPrevIndex(num.current - 1)
    			: setPrevIndex(swiper.realIndex - 1);
    		swiper.realIndex === num.current - 1
    			? setNextIndex(0)
    			: setNextIndex(swiper.realIndex + 1);
    	},
    	autoplay: { delay: 2000, disableOnInteraction: true },
    	breakpoints: {
    		1050: { slidesPerView: 2 },
    		1400: { slidesPerView: 3 }
    	}
    });

    -modules: Swiper 의 의존성을 관리하는 속성

    -loop: 1 ~ 4 ~ 1 ~ 4 순으로 화면이 미리 구성되게 만드는 속성으로 true 일 경우 '4 에서 1' 로 '자연스럽게' 넘어간다.

    -slidesPerView:

    -centeredSlides:

    -loopedSlides:

    -onSwiper:

    -onSlideChange:

    -autoplay:

    -breakpoints:
