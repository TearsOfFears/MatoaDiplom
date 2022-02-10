import React from "react";
import logo from "../assets/img/home/logo.png";
import { Buttons, IconLogin, IconCart } from "./index";
import { Link } from "react-router-dom";

import { useSelector } from "react-redux";
import { auth } from "./../firebase/utils";

const mapState = ({ user }) => ({
	currentUser: user.currentUser,
});

const Header = (props) => {
	const { currentUser } = useSelector(mapState);

	return (
		<nav
			className="navbar navbar-expand-lg ftco_navbar bg- ftco-navbar-light"
			id="ftco-navbar"
		>
			<div className="container align-items-center pt-3">
				<Link to="/" className="navbar-brand">
					<img src={logo} alt="" />
				</Link>
				<div className="d-flex ml-auto order-sm-start order-lg-last">
					{currentUser && (
						<div className="registrLogin">
							<span className="photoborder">
								<img src={currentUser.photoURL} alt="" />
							</span>
							<div className="" onClick={() => auth.signOut()}>
								<Buttons style="btn-login">Log Out</Buttons>
							</div>
							<Link to="/dashboard">
								<Buttons style="btn-login" text="My account" />
							</Link>
						</div>
					)}
					{!currentUser && (
						<div className="registrLogin">
							<Link to="/login">
								<Buttons style="btn-login" text="Log in" icon={<IconLogin />} />
							</Link>

							<Link to="/registration">
								<Buttons style="btn-login" text="Register" />
							</Link>
						</div>
					)}

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

Header.defaultProps = {
	currentUser: null,
};

export default Header;
