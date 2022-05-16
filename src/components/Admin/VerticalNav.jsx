import React from "react";
import { useSelector } from "react-redux";
import UserProfile from "./UserProfile";
import "./Admin.scss";
import { useEffect } from "react";
import { checkUserSession } from "../../redux/User/user.actions";
import { useDispatch } from "react-redux";
const mapState = ({ user }) => ({
	currentUser: user.currentUser,
});

const VerticalNav = (props) => {
	const { currentUser } = useSelector(mapState);
	const dispatch = useDispatch();
	useEffect(() => {
		dispatch(checkUserSession());
	}, []);

	const configUserProfile = {
		currentUser,
	};

	return (
		<div className="verticalNav">
			{currentUser !== null ? <UserProfile {...configUserProfile} /> : null}

			<div className="menu">{props.children}</div>
		</div>
	);
};

export default VerticalNav;
