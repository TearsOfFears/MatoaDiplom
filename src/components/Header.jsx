import React from "react";
import logo from "../assets/img/home/logo.png";

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
					<button className="btn-login">
						<svg
							width="24"
							height="24"
							viewBox="0 0 24 24"
							fill="none"
							xmlns="http://www.w3.org/2000/svg"
						>
							<path
								fillRule="evenodd"
								clipRule="evenodd"
								d="M18.0934 5.42961C18.6947 8.04541 17.4096 10.7298 14.995 11.9018C18.63 13.0124 21.1148 16.365 21.1198 20.1659V21.6059C21.1198 21.871 20.9049 22.0859 20.6398 22.0859C20.3747 22.0859 20.1598 21.871 20.1598 21.6059V20.1659C20.1598 15.9244 16.7214 12.4859 12.4798 12.4859C8.2383 12.4859 4.79984 15.9244 4.79984 20.1659V21.6059C4.79984 21.871 4.58494 22.0859 4.31984 22.0859C4.05475 22.0859 3.83984 21.871 3.83984 21.6059V20.1659C3.84491 16.365 6.32965 13.0124 9.96464 11.9018C7.55004 10.7298 6.26495 8.04541 6.86625 5.42961C7.46754 2.81381 9.79583 0.960007 12.4798 0.960007C15.1639 0.960007 17.4921 2.81381 18.0934 5.42961ZM12.4798 1.9259C9.82888 1.9259 7.67984 4.07493 7.67984 6.7259C7.68281 9.37564 9.8301 11.5229 12.4798 11.5259C15.1308 11.5259 17.2798 9.37687 17.2798 6.7259C17.2798 4.07493 15.1308 1.9259 12.4798 1.9259Z"
								fill="black"
							/>
						</svg>
						Log In
					</button>
					<button className="btn-cart">
						<svg
							width="24"
							height="24"
							viewBox="0 0 24 24"
							fill="none"
							xmlns="http://www.w3.org/2000/svg"
						>
							<path
								fillRule="evenodd"
								clipRule="evenodd"
								d="M19.2907 3.84C19.8032 3.83988 20.2254 4.24237 20.2498 4.7543L21.1185 22.9943C21.131 23.2566 21.0356 23.5125 20.8544 23.7025C20.6732 23.8925 20.4221 24 20.1595 24H4.79949C4.53702 23.9999 4.28603 23.8923 4.10493 23.7023C3.92384 23.5123 3.82844 23.2565 3.84093 22.9943L4.70954 4.7543C4.73394 4.24241 5.1561 3.83993 5.66858 3.84H8.68615C8.68615 1.71923 10.4054 0 12.5261 0C14.6469 0 16.3661 1.71923 16.3661 3.84H19.2907ZM15.4061 3.84C15.4043 2.25017 14.116 0.961799 12.5261 0.96C10.9363 0.961799 9.64794 2.25017 9.64614 3.84H15.4061ZM5.66859 4.8H8.68616V8.16C8.68616 8.4251 8.90106 8.64 9.16616 8.64C9.43126 8.64 9.64616 8.4251 9.64616 8.16V4.8H15.4062V8.16C15.4062 8.4251 15.6211 8.64 15.8862 8.64C16.1513 8.64 16.3662 8.4251 16.3662 8.16V4.8H19.2797L19.9741 19.2H4.98286L5.66859 4.8ZM4.93668 20.16L4.7995 23.04H20.1595L20.0204 20.16H4.93668Z"
								fill="#333333"
							/>
						</svg>
						<span>1</span>
					</button>
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
