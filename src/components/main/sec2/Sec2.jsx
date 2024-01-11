import { useState } from 'react';
import Linetext from '../linetext/Linetext';
import './Sec2.scss';
import { FaRegSmile } from 'react-icons/fa';
import Card from '../card/Card';

export default function Sec2() {
	const [Data, setData] = useState([
		{
			title: 'Professional',
			body: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Distinctio nihil eos mollitia, facilis in ipsum enim harum ducimus provident molestiae neque, commodi odio minus quasi sit rerum veniam nemo sequi?'
		},
		{
			title: 'Creative Design',
			body: 'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Fugit commodi mollitia delectus ipsam fuga rem iusto reiciendis non. Cupiditate animi reiciendis consequuntur quisquam. Libero, alias!'
		},
		{
			title: 'Building Fastly',
			body: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Commodi illum, tenetur obcaecati reiciendis adipisci neque placeat labore doloremque fugit eum dolorem eaque accusamus. Numquam tempora totam, optio delectus minus distinctio?'
		},
		{
			title: 'Dedicate Support',
			body: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Consequuntur recusandae ipsa animi beatae? Reprehenderit eius consequuntur, vitae voluptate in eligendi porro pariatur soluta nostrum ducimus perferendis doloremque impedit.'
		},
		{
			title: 'Money Served',
			body: 'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Quisquam facere praesentium tenetur provident repellendus eveniet dolor porro cum illo Lorem, ipsum dolor sit amet consectetur adipisicing elit. Numquam, maxime.'
		}
	]);

	return (
		<section className='Sec2'>
			<Linetext tit1='NORM SERVICES' tit2='LSOSERVIESSDAMPJALL' />

			<div className='wrap'>
				<Card Icon={FaRegSmile} />
			</div>
		</section>
	);
}
