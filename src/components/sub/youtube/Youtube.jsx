import Layout from '../../common/layout/Layout';
import Sec1 from './comp/sec1/Sec1';
import Sec2 from './comp/sec2/Sec2';
import './Youtube.scss';

export default function Youtube() {
	// component 분리하기
	return (
		<Layout title={'Exciting Youtube'} className='Youtube'>
			<Sec1 />
			<Sec2 />
		</Layout>
	);
}

/* 
<section className='introduce'>
				We are ready <strong>5 projects</strong> videos for you
			</section>
			<section className='articles'>
				
			</section>

			const [date, tmpTime] = video.snippet.publishedAt.split('T');
			wordSlice(video.snippet.title, 5)
			wordSlice(video.snippet.description, 50)
			video.snippet.thumbnails.standard.url} alt={video.snippet.title}
*/

/* 
  home 을 갔다가 Youtube 로 가면 문제가 없는데 youtube 로 바로가면 문제가 생김
*/
