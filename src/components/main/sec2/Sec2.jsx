import { useEffect, useRef, useState } from 'react';
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
	const Icons = useRef([
		FaRegSmile,
		MdOutlineBolt,
		HiOutlineLightBulb,
		BiDollar,
		TiMessage
	]);

	return (
		<section className='Sec2'>
			<Linetext tit1='NORM SERVICES' tit2='LSOSERVIESSDAMPJALL' />
			<div className='wrap'>
				{isSuccess &&
					data.map((el, idx) => {
						return (
							<>
								<Card
									key={idx}
									Icon={Icons.current[idx]}
									title={el.title}
									content={el.body}
								/>
							</>
						);
					})}
				<Card
					SpecialCard={
						<div className='specialCard'>
							<h3>Our Works</h3>
							<span>Loremipsumdolor</span>
						</div>
					}
				/>
			</div>
		</section>
	);
}
