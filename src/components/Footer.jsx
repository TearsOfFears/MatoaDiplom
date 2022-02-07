import React from "react";

import logoWhite from "../assets/img/home/logo-white.png";
import { Buttons } from "./index";

import {
	faInstagram,
	faTwitter,
	faFacebookF,
	faYoutube,
} from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function Footer() {
	return (
		<footer className="footer nopadding">
			<div className="container nopadding">
				<div className="row pt-5">
					<div className="wrapper-footer">
						<div className="wrapper-info">
							<img src={logoWhite} alt="" />
							<div className="wrapper-info__adress ">
								<h2>Address</h2>
								<p>
									Store & Office
									<br />
									Jl. Setrasari Kulon III, No. 10-12, Sukarasa, Sukasari,
									Bandung, Jawa Barat, Indonesia 40152
								</p>
							</div>
							<div className="wrapper-info__hours">
								<h2>Office Hour</h2>
								<p>
									{" "}
									Monday - Sunday
									<br />
									10.00 - 18.00
								</p>
							</div>
						</div>
						<div className="contacts">
							<h1>Get in touch</h1>
							<hr />
							<div className="wrapper-contacts">
								<div className="wrapper-contacts-block">
									<h2>Phone</h2>
									<p>022-20277564</p>
								</div>
								<div className="wrapper-contacts-block">
									<h2>
										Service <br />
										Center
									</h2>
									<p>0811-233-8899</p>
								</div>
								<div className="wrapper-contacts-block">
									<h2>
										Customer
										<br />
										Service
									</h2>
									<p>0811-235-9988</p>
								</div>
							</div>
							<ul>
								<li>
									<Buttons style="none">
										<FontAwesomeIcon icon={faFacebookF} />
									</Buttons>
								</li>
								<li>
									<Buttons style="none">
										<FontAwesomeIcon icon={faInstagram} />
									</Buttons>
								</li>
								<li>
									<Buttons style="none">
										<FontAwesomeIcon icon={faTwitter} />
									</Buttons>
								</li>
								<li>
									<Buttons style="none">
										<FontAwesomeIcon icon={faYoutube} />
									</Buttons>
								</li>
							</ul>
						</div>
						<div className="links">
							<h1>Useful Link</h1>
							<hr />
							<ul>
								<li>
									<a href="#" className="nav-link-footer">
										{" "}
										Warranty & Complaints
									</a>
								</li>
								<li>
									<a href="#" className="nav-link-footer">
										Order & Shipping
									</a>
								</li>
								<li>
									<a href="#" className="nav-link-footer">
										Tracking Order
									</a>
								</li>
								<li>
									<a href="#" className="nav-link-footer">
										About Us
									</a>
								</li>
								<li>
									<a href="#" className="nav-link-footer">
										{" "}
										Repair
									</a>
								</li>
								<li>
									<a href="#" className="nav-link-footer">
										Terms
									</a>
								</li>
								<li>
									<a href="#" className="nav-link-footer">
										{" "}
										FAQ
									</a>
								</li>
							</ul>
						</div>
						<div className="compaign">
							<h1>Campaign</h1>
							<hr />
							<ul>
								<li>
									<a href="" className="nav-link-footer">
										Mengenal Arti Cukup
									</a>
								</li>
								<li>
									<a href="" className="nav-link-footer">
										Tell Your Difference
									</a>
								</li>
								<li>
									<a href="" className="nav-link-footer">
										Waykambas
									</a>
								</li>
								<li>
									<a href="" className="nav-link-footer">
										Rebrand
									</a>
								</li>
								<li>
									<a href="" className="nav-link-footer">
										{" "}
										Gallery
									</a>
								</li>
								<li>
									<a href="" className="nav-link-footer">
										Singo
									</a>
								</li>
								<li>
									<a href="" className="nav-link-footer">
										{" "}
										Rakai
									</a>
								</li>
							</ul>
						</div>
					</div>
				</div>
			</div>
		</footer>
	);
}

export default Footer;
