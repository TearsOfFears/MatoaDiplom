import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUserOrderHistory } from "../redux/Orders/orders.actions";
import { selectCartItems } from "../redux/Carts/cart.selectors";

import { RenderOrderHistory } from "../components";
import { checkUserSession } from "../redux/User/user.actions";

const mapState = ({ user, ordersData }) => ({
	currentUser: user.currentUser,
	orderData: ordersData.ordersHistory.data,
});

const Dashboard = (props) => {
	const dispatch = useDispatch();
	const { currentUser, orderData } = useSelector(mapState);
	useEffect(() => {
		dispatch(checkUserSession());
	}, []);
	return (
		<div className="wrapper">
			<RenderOrderHistory  {...currentUser}/>
		</div>
	);
};

export default Dashboard;
