import React from "react";
import { Link } from "react-router-dom";
import { Footer, Header, Bils } from "../components";

import { useDispatch } from "react-redux";

import UserProfile from "../components/Admin/UserProfile";
import VerticalNav from "../components/Admin/VerticalNav";
import { signOutUserStart } from "../redux/User/user.actions";

const ItemLayout = (props) => {
	const dispatch = useDispatch();

	const signOut = () => {
		dispatch(signOutUserStart());
	};

	return (
		<div className="adminLayout">
			<Header {...props} />
			<div className="container">
				<div className="contorlPanel">
					<div className="sideBar">
						<VerticalNav>
							<ul>
								<li>
									{" "}
									<Link to="/admin">До дому</Link>
								</li>
								<li>
									<span className="btn" onClick={() => signOut()}> Вийти</span>
								</li>
							</ul>
						</VerticalNav>
					</div>
				</div>
				<div className="content">{props.children}</div>
			</div>
			<Footer />
		</div>
	);
};

export default ItemLayout;
