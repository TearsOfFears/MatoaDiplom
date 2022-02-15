import React from "react";
import { Link } from "react-router-dom";

import { checkUserIsAdmin } from "../../utils/utils";
import { useSelector } from "react-redux";

const mapState = ({ user }) => ({
	currentUser: user.currentUser,
});

const AdminToolBar = () => {
	const { currentUser } = useSelector(mapState);
	const isAdmin = checkUserIsAdmin(currentUser);
	if (!isAdmin) return false;
	return (
		<div className="adminToolBar">
			<div className="container">
				AdminToolBar
				<Link to="/admin">My Admin</Link>
			</div>
		</div>
	);
};

export default AdminToolBar;
