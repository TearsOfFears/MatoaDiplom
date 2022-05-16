import React, { useEffect } from "react";
import { useNavigate, useParams } from "react-router";
import { getOrderDetailsStart, setLoadedOrders } from "../redux/Orders/orders.actions";
import { useSelector, useDispatch } from "react-redux";
import { Buttons, OrderDetails } from "../components";
import { Box, LinearProgress } from "@material-ui/core";
const mapState = ({ ordersData }) => ({
	orderDetails: ordersData.orderDetails,
	loading: ordersData.isLoaded,
});

const Order = () => {
	const { orderID } = useParams();
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const { orderDetails, loading } = useSelector(mapState);
	const { grandTotal, packagingPrice } = orderDetails;
	useEffect(() => {
		dispatch(setLoadedOrders(true));
		dispatch(getOrderDetailsStart(orderID));
	}, []);
	return (
		<div className="order">
			<h3>fff</h3>
			<h2>ID - замовлення : {orderID}</h2>
			{loading ? (
				<Box sx={{ width: "100%", marginTop: "20px", marginBottom:"50px" }}>
					<LinearProgress />
				</Box>
			) : (
				<div>
					<OrderDetails order={orderDetails} />
					<div className="orderDetails">
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
			)}
		</div>
	);
};

export default Order;
