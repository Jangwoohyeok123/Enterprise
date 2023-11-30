import './Footer.scss';
import { FaFacebookF, FaTwitter, FaYoutube, FaGoogle, FaSpotify } from 'react-icons/fa';
//npm i react-icons

export default function Footer() {
	return (
		<footer className='Footer'>
			<ul>
				<li>
					<h1>logo</h1>
					<span>good company</span>
				</li>
				<li>
					<h6></h6>
					<div>span</div>
					<div>span</div>
					<div>span</div>
				</li>
				<li>
					<h6></h6>
					<div>span</div>
					<div>span</div>
					<div>span</div>
				</li>
				<li>
					<h6></h6>
					<div>span</div>
					<div>span</div>
					<div>span</div>
				</li>
				<li>
					<h6></h6>
					<div>span</div>
					<div>span</div>
					<div>span</div>
				</li>
			</ul>
			<div className='sns'>
				<span>
					<FaYoutube size='23' />
				</span>
				<span>
					<FaTwitter size='23' />
				</span>
				<span>
					<FaFacebookF size='23' />
				</span>
				<span>
					<FaGoogle size='23' />
				</span>
				<span>
					<FaSpotify size='23' />
				</span>
			</div>
		</footer>
	);
}

//<FaYoutube /><FaTwitter /><FaFacebookF />
