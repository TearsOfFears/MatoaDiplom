import React from "react";
import logo from "../assets/img/home/logo.png";
import { Buttons, IconLogin, IconCart } from "./index";
import { Link } from "react-router-dom";

const Header = (props) => {
	return (
		<nav
			className="navbar navbar-expand-lg ftco_navbar bg- ftco-navbar-light"
			id="ftco-navbar"
		>
			<div className="container align-items-center pt-3">
				<a href="#" className="navbar-brand" href="index.html">
					<img src={logo} alt="" />
				</a>

				<div className="d-flex ml-auto order-sm-start order-lg-last">
					<Buttons style="btn-login" text="Log in" icon={<IconLogin />} />
					<Link to="/cart">
						<Buttons style="btn-cart" icon={<IconCart />}>
							<span>1</span>
						</Buttons>
					</Link>
				</div>

				<button
					className="navbar-toggler"
					type="button"
					data-toggle="collapse"
					data-target="#ftco-nav"
					aria-controls="ftco-nav"
					aria-expanded="false"
					aria-label="Toggle navigation"
				>
					<span className="fa fa-bars"></span>
				</button>

				<div
					className="collapse navbar-collapse animate__animated"
					id="ftco-nav"
				>
					<ul className="navbar-nav m-auto ">
						<li className="nav-item ">
							<a href="#" className="nav-link">
								Watches
							</a>
						</li>
						<li className="nav-item">
							<a href="#" className="nav-link">
								Eyewear
							</a>
						</li>
						<li className="nav-item">
							<a href="#" className="nav-link">
								Accessories
							</a>
						</li>
						<li className="nav-item">
							<a href="#" className="nav-link">
								News
							</a>
						</li>
					</ul>
				</div>
			</div>
		</nav>
	);
};
export default Header;
