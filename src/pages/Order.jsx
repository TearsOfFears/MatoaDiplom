import React, { useEffect } from "react";
import { useParams } from "react-router";
import { getOrderDetailsStart } from "../redux/Orders/orders.actions";
import { useSelector, useDispatch } from "react-redux";
import { OrderDetails } from "../components";
const mapState = ({ ordersData }) => ({
	orderDetails: ordersData.orderDetails,
});

const Order = () => {
	const { orderID } = useParams();
	const dispatch = useDispatch();
	const { orderDetails } = useSelector(mapState);
	const { orderTotal } = orderDetails;
	useEffect(() => {
		dispatch(getOrderDetailsStart(orderID));
	}, []);
	return (
		<div>
            <h2>{orderID}</h2>
			<OrderDetails order={orderDetails}/>
		</div>
	);
};

export default Order;
