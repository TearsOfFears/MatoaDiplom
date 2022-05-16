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

	const { currentUser, cartDataAll, orderHistoryLast } = useSelector(mapState);
	const { total, itemCount, cartItems, calcPrice } = useSelector(mapStateItems);

	useEffect(() => {
		if (stage.index === 2) {
			if (typeof orderHistoryLast !== "undefined") {
				let lastElementCurent = orderHistoryLast[orderHistoryLast.length - 1];
				setLastElement({ ...lastElementCurent });
			}
		}
	}, [orderHistoryLast]);

	const { line1, line2, country, country_code, city, state, postal_code } =
		stage.shippingAddress || {};
	return (
		<div className="container confirmation">
			<div className="col-12 d-flex flex-row justify-content-center">
				<div className="col-5 bg-white d-flex flex-column align-items-center text-center justify-content-evenly mr-5">
					<img src={Confirm} alt="" />
					<h2 className="mt-3">Замовлення підтверджено</h2>
					<h3>
						Ваше замовлення підтверджено, перейдіть за посиланням щоб перевірити
						його
					</h3>
					<ButtonForm
						onClick={(e) => {
							navigate(`/order/${lastElement.documentID}`);
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
														{quantity} од. x {price} ₴
													</p>
												</li>
											);
										})}
								</ul>
							</div>
						</div>

						<div className="wrapper-detail mt-4 mb-4">
							<div className="wrapper-detail__headers_1">
								<h3>Проміжна сума</h3>
								<h3>Вартість доставки</h3>
								<h3>Упаковка</h3>
							</div>
							<div className="wrapper-detail__headers_2">
								<h3>{lastElement.subtotal} ₴</h3>
								<h3> ~100 ₴</h3>
								<h3>{lastElement.packagingPrice} ₴</h3>
							</div>
						</div>

						<div className="wrapper-detail border-top border-bottom pt-3 pb-3">
							<div className="wrapper-detail__headers_1">
								<h2>Загальна сума</h2>
							</div>
							<div className="wrapper-detail__headers_2">
								<h1>{lastElement.grandTotal} ₴</h1>
							</div>
						</div>
						<div className="wrapper-detail wrapper-detail-address mt-3">
							<div className="wrapper-detail__headers_1">
								<h4>Адреса відправки</h4>
							</div>
							<div className="wrapper-detail__headers_2">
								<p>
									{" "}
									{line1} {line2} {country}, {state}, {city} {country_code}
									{postal_code}
								</p>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Confirmation;
