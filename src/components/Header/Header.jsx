import React, { useState } from "react";
import logo from "./../../assets/img/home/logo.png";
import { Buttons, IconLogin, IconCart } from "../index";
import { Link, useNavigate } from "react-router-dom";
import { selectCartItemsCount } from "../../redux/Carts/cart.selectors";
import { useSelector, useDispatch } from "react-redux";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { signOutUserStart } from "../../redux/User/user.actions";
import Box from "@material-ui/core/Box";
import ClickAwayListener from "@material-ui/core/ClickAwayListener/ClickAwayListener";
import "./header.scss";
import { Navbar, Nav, Container, NavDropdown } from "react-bootstrap";
const mapState = (state) => ({
	currentUser: state.user.currentUser,
	totalNumItems: selectCartItemsCount(state),
});

const Header = (props) => {
	const { currentUser, totalNumItems } = useSelector(mapState);
	const navigate = useNavigate();
	const dispatch = useDispatch();

	const [open, setOpen] = useState(false);

	const handleClick = () => {
		setOpen((prev) => !prev);
	};

	const handleClickAway = () => {
		setOpen(false);
	};

	const signOut = () => {
		dispatch(signOutUserStart());
		navigate("/");
	};

	return (
		<Navbar expand="lg" fixed="top">
			<Container className="pt-4 pb-3">
				<Navbar.Brand>
					<Link to="/">
						<img src={logo} alt="" />
					</Link>
				</Navbar.Brand>
			
				<Navbar.Collapse
					id="responsive-navbar-nav"
					className="justify-content-end"
				>
					<Nav className="justify-content-center w-100">
						<Nav.Item>
							<Link to="/products" className="nav-link">
								Products
							</Link>
						</Nav.Item>
						<Nav.Item>
							<Link to="/products" className="nav-link">
								Eyewear
							</Link>
						</Nav.Item>
						<Nav.Item>
							<Link to="/products" className="nav-link">
								Accessories
							</Link>
						</Nav.Item>
						<Nav.Item>
							<Link to="/products" className="nav-link">
								Eyewear
							</Link>
						</Nav.Item>
					</Nav>
				</Navbar.Collapse>

				<div className="d-flex">
					{currentUser && (
						<div className="registrLogin">
							<ClickAwayListener onClickAway={handleClickAway}>
								<Box sx={{ position: "relative" }}>
									<span className="photoborder" onClick={handleClick}>
										{currentUser.photoURL === null ? (
											<IconLogin />
										) : (
											<img src={currentUser.photoURL} alt="" />
										)}
									</span>
									{open ? (
										<Box className="box">
											<ul>
												<li>
													<Link to="/dashboard" className="btn-login">
														Акаунт
													</Link>
												</li>
												<li>
													<Buttons
														style="btn-login"
														text="Вийти"
														onClick={() => signOut()}
													/>
												</li>
											</ul>
										</Box>
									) : null}
								</Box>
							</ClickAwayListener>
						</div>
					)}
					{!currentUser && (
						<div className="registrLogin">
							<Link to="/login">
								<Buttons style="btn-login" text="Увійти" icon={<IconLogin />} />
							</Link>
						</div>
					)}

					<Link to="/cart">
						<Buttons style="btn-cart" icon={<IconCart />}>
							{totalNumItems > 0 ? <span>{totalNumItems}</span> : <div></div>}
						</Buttons>
					</Link>
				</div>
				<Navbar.Toggle aria-controls="responsive-navbar-nav" />
			</Container>
		</Navbar>
	);
};

Header.defaultProps = {
	currentUser: null,
};

export default Header;
