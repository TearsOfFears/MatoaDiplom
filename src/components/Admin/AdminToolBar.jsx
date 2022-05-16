import React from "react";
import { Link } from "react-router-dom";

import { checkUserIsAdmin } from "../../utils/utils";
import { useSelector } from "react-redux";
import "./adminToolBar.scss";
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
				Панель Адміністратора
				<Link to="/admin">Адмінка</Link>
			</div>
		</div>
	);
};

export default AdminToolBar;
