import { useRef } from 'react';
import './GetTouchSection.scss';
import { CiMap } from 'react-icons/ci';
import { IoIosPhonePortrait } from 'react-icons/io';
import { IoMailOpenOutline } from 'react-icons/io5';

export default function GetTouchSection() {
	const infos = useRef([
		{
			icon: <CiMap />,
			title: 'Office',
			line1: '2CA, Downtow, New Okland',
			line2: 'United states'
		},
		{
			icon: <IoIosPhonePortrait />,
			title: 'Call Us',
			line1: '(+1)2020 3990 00 456',
			line2: '(+1)2020 3990 01 012'
		},
		{
			icon: <IoMailOpenOutline />,
			title: 'Send Us',
			line1: 'dobussiness27@naver.com',
			line2: 'ikarus39912@gmail.com'
		}
	]);

	return (
		<section className='GetTouchSection'>
			<h1>Get In Touch With Us</h1>
			<p>
				Please contact us using the information below. To locate contacts in the
				Business office closet to you, visit out office websites.
			</p>
			<div className='infos'>
				{infos.current.map((info, idx) => {
					return (
						<div className='info'>
							<div className='iconBox'>{info.icon}</div>
							<div className='txtBox'>
								<h3>{info.title}</h3>
								<span>{info.line1}</span>
								<span>{info.line2}</span>
							</div>
						</div>
					);
				})}
			</div>
		</section>
	);
}
