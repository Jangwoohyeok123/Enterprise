import { useEffect, useRef, useState } from 'react';
import './GetTouchSection.scss';
import { CiMap } from 'react-icons/ci';
import { IoIosPhonePortrait } from 'react-icons/io';
import { IoMailOpenOutline } from 'react-icons/io5';
import { useGlobalData } from '../../../../../hooks/useGlobalData';

export default function GetTouchSection() {
	console.log('render');
	const { ViewType } = useGlobalData();
	// const iconSize = useRef(70);
	const [IconSize, setIconSize] = useState(70);

	const infos = useRef([
		{
			icon: <CiMap size={IconSize} />,
			title: 'Office',
			line1: '2CA, Downtow, New Okland',
			line2: 'United states'
		},
		{
			icon: <IoIosPhonePortrait size={IconSize} />,
			title: 'Call Us',
			line1: '(+1)2020 3990 00 456',
			line2: '(+1)2020 3990 01 012'
		},
		{
			icon: <IoMailOpenOutline size={IconSize} />,
			title: 'Send Us',
			line1: 'dobussiness27@naver.com',
			line2: 'ikarus39912@gmail.com'
		}
	]);

	useEffect(() => {
		console.log(ViewType === 'Mobile');
		if (ViewType === 'Mobile') setIconSize(30);
	}, []);

	console.log(ViewType);

	return (
		<section className='GetTouchSection'>
			<div>
				<div className='introduce'>
					<h1>Get In Touch With Us</h1>
					<p>
						Please contact us using the information below. To locate contacts in
						the Business office closet to you, visit out office websites.
					</p>
				</div>

				<div className='infos'>
					{infos.current.map((info, idx) => {
						return (
							<div className='info'>
								<div className='iconBox'>{info.icon}</div>
								<div className='txtBox'>
									<h3>{info.title}</h3>
									<p>{info.line1}</p>
									<p>{info.line2}</p>
								</div>
							</div>
						);
					})}
				</div>
			</div>
		</section>
	);
}
