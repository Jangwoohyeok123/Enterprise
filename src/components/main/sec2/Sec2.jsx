import { useEffect, useState } from 'react';
import Linetext from '../linetext/Linetext';
import './Sec2.scss';
import { FaRegSmile } from 'react-icons/fa';
import { MdOutlineBolt } from 'react-icons/md';
import { HiOutlineLightBulb } from 'react-icons/hi';
import { BiDollar } from 'react-icons/bi';
import { TiMessage } from 'react-icons/ti';
import Card from '../card/Card';
import { useQuerySec2 } from '../../../query/useQueryMainSec2';

export default function Sec2() {
	const { isSuccess, data } = useQuerySec2();
	const Icons = [
		FaRegSmile,
		MdOutlineBolt,
		HiOutlineLightBulb,
		BiDollar,
		TiMessage
	];

	useEffect(() => {
		console.log(data);
	});

	return (
		<section className='Sec2'>
			<Linetext tit1='NORM SERVICES' tit2='LSOSERVIESSDAMPJALL' />
			<div className='wrap'>
				{isSuccess &&
					data.map((el, idx) => {
						return (
							<>
								<Card Icon={Icons[idx]} title={el.title} content={el.body} />
							</>
						);
					})}
				<div className='specialCard'>
					<h3>Our Works</h3>
					<span>Loremipsumdolor</span>
				</div>
			</div>
		</section>
	);
}

/* 
	<Card Icon={FaRegSmile} />
						<Card Icon={MdOutlineBolt} />
						<Card Icon={HiOutlineLightBulb} />
						<Card Icon={BiDollar} />
						<Card Icon={TiMessage} />
					


*/
