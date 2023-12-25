import { useRef } from 'react';
import './Footer.scss';
import { FaFacebookF, FaTwitter, FaYoutube, FaGoogle, FaSpotify } from 'react-icons/fa';
import { useLocation } from 'react-router-dom';
//npm i react-icons

export default function Footer() {
	const location = useLocation();

	return (
		<>
			{location.pathname !== '/signup' && (
				<footer className='Footer'>
					<ul className='top'>
						<li className='logo'>
							<h6>logo</h6>
							<span>good company</span>
						</li>
						<li>
							<div>weebly themes</div>
							<div>pre-sale faqs</div>
							<div>submit a ticket</div>
						</li>
						<li>
							<div>services</div>
							<div>theme tweak</div>
						</li>
						<li>
							<div>showcase</div>
							<div>widgetkit</div>
							<div>support</div>
						</li>
						<li>
							<div>about us</div>
							<div>contact us</div>
							<div>Affiliates</div>
							<div>Resource</div>
						</li>
					</ul>
					<div className='bottom'>
						<div className='sns'>
							<span className='icon'>
								<FaYoutube size='15' />
							</span>
							<span className='icon'>
								<FaTwitter size='15' />
							</span>
							<span className='icon'>
								<FaFacebookF size='15' />
							</span>
							<span className='icon'>
								<FaGoogle size='15' />
							</span>
							<span className='icon'>
								<FaSpotify size='15' />
							</span>
						</div>
						<div>&copy;Copyright All rights reserved.</div>
					</div>
				</footer>
			)}
		</>
	);
}

//<FaYoutube /><FaTwitter /><FaFacebookF />
