import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUserOrderHistory } from "../redux/Orders/orders.actions";
import { selectCartItems } from "../redux/Carts/cart.selectors";

import { RenderOrderHistory } from "../components";

const mapState = ({ user, ordersData }) => ({
	currentUser: user.currentUser,
	orderData: ordersData.ordersHistory.data,
});

const Dashboard = (props) => {
	const dispatch = useDispatch();

	const { currentUser, orderData } = useSelector(mapState);
	
	const { price, ordersHistory } = orderData || [];
	
	console.log(orderData);
	useEffect(() => {
		dispatch(getUserOrderHistory(currentUser.id));
	}, []);
	return (
		<div>
			<h1>Orders</h1>
			<RenderOrderHistory orders={orderData}/>
		</div>
	);
};

export default Dashboard;
