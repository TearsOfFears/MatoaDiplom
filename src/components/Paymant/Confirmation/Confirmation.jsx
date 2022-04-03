import React, { useEffect, useState } from "react";
import "./style.scss";
import Confirm from "./../../../assets/img/cart/confirmlogo.png";
import { ButtonForm } from "../..";
import { useNavigate } from "react-router-dom";
import { createStructuredSelector } from "reselect";
import {
	selectCartTotal,
	selectCartItemsCount,
	selectCartItems,
	selectCartItemsCountPrice,
} from "./../../../redux/Carts/cart.selectors";
import { useSelector } from "react-redux";
import { formatDate } from "../../../utils/utils";
import { useDispatch } from "react-redux";
import { getUserOrderHistory } from "../../../redux/Orders/orders.actions";
const objDefault = {
	orderCreated: 0,
	packagingPrice: 0,
	grandTotal: 0,
	subtotal: 0,
};
const mapStateItems = createStructuredSelector({
	total: selectCartTotal,
	itemCount: selectCartItemsCount,
	cartItems: selectCartItems,
	calcPrice: selectCartItemsCountPrice,
});

const mapState = ({ user, cartData, ordersData }) => ({
	currentUser: user.currentUser,
	cartDataAll: cartData.cartItems,
	orderHistoryLast: ordersData.ordersHistory.data,
});

const Confirmation = ({ handleChangeState, stage, setStage }) => {
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const [lastElement, setLastElement] = useState({ ...objDefault });

	//console.log(orderHistoryLast);
	const { currentUser, cartDataAll, orderHistoryLast } = useSelector(mapState);
	const { total, itemCount, cartItems, calcPrice } = useSelector(mapStateItems);
	console.log(stage.index);

	useEffect(() => {
		if (stage.index === 2) {
			if (typeof orderHistoryLast !== "undefined") {
				let lastElementCurent = orderHistoryLast[orderHistoryLast.length - 1];
				setLastElement({ ...lastElementCurent });
			}
		}
	}, [orderHistoryLast]);

	return (
		<div className="container confirmation">
			<div className="col-12 d-flex flex-row justify-content-between">
				<div className="col-6 bg-white d-flex flex-column align-items-center justify-content-evenly mr-5">
					<img src={Confirm} alt="" />
					<h2>Order Confirmed</h2>
					<h3>
						Your order have been confirmed, please wait and track your order
					</h3>
					<ButtonForm
						onClick={(e) => {
							navigate("/dashboard");
						}}
					>
						Перейти до замовлення
					</ButtonForm>
				</div>
				<div className="col-6 bg-white ml-5">
					<div className="wrapper-detail-order">
						<div className="wrapper-detail mt-3">
							<div className="wrapper-detail__headers_1">
								<h4>Час створення замовлення</h4>
							</div>
							<div className="wrapper-detail__headers_2">
								<p>{formatDate(lastElement.orderCreated)}</p>
							</div>
						</div>
						<div className="wrapper-detail__headers_1">
							<div className="infoOrder">
								<ul>
									{Array.isArray(lastElement.orderItems) &&
										lastElement.orderItems.map((data, key) => {
											const { quantity, productName, price } = data;
											return (
												<li key={key}>
													<h4>{productName}</h4>
													<p>
														{quantity} од. x {price} грн.
													</p>
												</li>
											);
										})}
								</ul>
							</div>
						</div>

						<div className="wrapper-detail mt-4 mb-4">
							<div className="wrapper-detail__headers_1">
								<h3>Subtotal</h3>
								<h3>Shipping Cost</h3>
								<h3>Packaging</h3>
							</div>
							<div className="wrapper-detail__headers_2">
								<h3>{lastElement.subtotal} грн.</h3>
								<h3> 500 грн.</h3>
								<h3>{lastElement.packagingPrice} грн.</h3>
							</div>
						</div>

						<div className="wrapper-detail border-top border-bottom pt-3 pb-3">
							<div className="wrapper-detail__headers_1">
								<h2>Grand Total</h2>
							</div>
							<div className="wrapper-detail__headers_2">
								<h1>{lastElement.grandTotal} грн.</h1>
							</div>
						</div>
						<div className="wrapper-detail mt-3">
							<div className="wrapper-detail__headers_1">
								<h4>Shipping Address</h4>
							</div>
							<div className="wrapper-detail__headers_2">
								<p>18 Richardson Drive Fountain Valley, CA 92708</p>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Confirmation;
