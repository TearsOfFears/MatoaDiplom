import React, { useEffect } from "react";
import { useNavigate, useParams } from "react-router";
import { getOrderDetailsStart } from "../redux/Orders/orders.actions";
import { useSelector, useDispatch } from "react-redux";
import { Buttons, OrderDetails } from "../components";
const mapState = ({ ordersData }) => ({
	orderDetails: ordersData.orderDetails,
});

const Order = () => {
	const { orderID } = useParams();
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const { orderDetails } = useSelector(mapState);
	const { grandTotal, packagingPrice } = orderDetails;
	useEffect(() => {
		dispatch(getOrderDetailsStart(orderID));
	}, []);
	return (
		<div className="order">
			<h2>ID - замовлення : {orderID}</h2>
			<OrderDetails order={orderDetails} />
			<div className="w-100 d-flex flex-row align-items-center justify-content-center">
				<div className="col-6 d-flex justify-content-center mt-0">
					<Buttons style="btn-read" onClick={(e) => navigate("/dashboard")}>
						Назад
					</Buttons>
				</div>
				<div className="col-6">
					<div className="d-flex mt-3 mb-3 flex-row justify-content-between">
						<h3>Вартість упаковки : </h3>
						<h3>{packagingPrice} ₴</h3>
					</div>
					<div className="d-flex mt-1 mb-3 flex-row justify-content-between ">
						<h3>Загальна вартість : </h3>
						<h3>{grandTotal} ₴</h3>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Order;
