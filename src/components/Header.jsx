import React from "react";
import logo from "../assets/img/home/logo.png";
import { Buttons, IconLogin, IconCart } from "./index";
import { Link } from "react-router-dom";
import { selectCartItemsCount } from "../redux/Carts/cart.selectors";
import { useSelector, useDispatch } from "react-redux";

import { signOutUserStart } from "../redux/User/user.actions";

const mapState = (state) => ({
	currentUser: state.user.currentUser,
	totalNumItems: selectCartItemsCount(state),
});

const Header = (props) => {
	const { currentUser, totalNumItems } = useSelector(mapState);

	const dispatch = useDispatch();

	const signOut = () => {
		dispatch(signOutUserStart());
	};

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
								{currentUser.photoURL === null ? (
									<IconLogin />
								) : (
									<img src={currentUser.photoURL} alt="" />
								)}
							</span>
							<div className="" onClick={() => signOut()}>
								<Buttons style="btn-login">Log Out</Buttons>
							</div>
							<Link to="/dashboard">
								<Buttons style="btn-login" text="My account" />
							</Link>
						</div>
					)}
					{!currentUser && [
						<div className="registrLogin">
							<Link to="/login">
								<Buttons style="btn-login" text="Log in" icon={<IconLogin />} />
							</Link>

							<Link to="/registration">
								<Buttons style="btn-login" text="Register" />
							</Link>
						</div>,
					]}

					<Link to="/cart">
						<Buttons style="btn-cart" icon={<IconCart />}>
							{totalNumItems > 0 ? <span>{totalNumItems}</span> : <div></div>}
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
							<Link to="/products" className="nav-link">
								Products
							</Link>
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
