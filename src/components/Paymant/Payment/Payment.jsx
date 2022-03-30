import React, { useState } from "react";
import "./style.scss";
import {
	CardElement,
	useElements,
	useStripe,
	CardElementComponent,
} from "@stripe/react-stripe-js";
import {
	selectCartTotal,
	selectCartItemsCount,
	selectCartItems,
	selectCartItemsCountPrice,
} from "./../../../redux/Carts/cart.selectors";
import { createStructuredSelector } from "reselect";
import { apiInstance } from "./../../../utils/utils";
import { useSelector, useDispatch } from "react-redux";
import { saveOrderHistory } from "../../../redux/Orders/orders.actions";
import { ButtonForm } from "../..";

const mapState = ({ user, cartData }) => ({
	currentUser: user.currentUser,
	cartDataAll: cartData.cartItems,
});

const mapStateItems = createStructuredSelector({
	total: selectCartTotal,
	itemCount: selectCartItemsCount,
	cartItems: selectCartItems,
	calcPrice: selectCartItemsCountPrice,
});

function Payment({ handleChangeState, stage }) {
	const elements = useElements();
	const dispatch = useDispatch();
	const { currentUser, cartDataAll } = useSelector(mapState);
	const { total, itemCount, cartItems, calcPrice } = useSelector(mapStateItems);
	const stripe = useStripe();

	const configCardElement = {
		iconStyle: "solid",
		style: {
			base: {
				fontSize: "16px",
			},
		},
		hidePostalCode: true,
	};

	const {
		phoneNumber,
		line1,
		line2,
		country,
		country_code,
		city,
		state,
		postal_code,
	} = stage.shippingAddress || {};

	let pricePackage = 0

	let grandTotal = 0

	const sutmitPayment = async (evt) => {
		evt.preventDefault();
		pricePackage = calcPrice.reduce((prev, current) => prev + current);
		grandTotal = total + 500 + pricePackage;
		const cardElement = elements.getElement("card");
		handleChangeState(
			2,
			stage.billingAddress,
			stage.shippingAddress,
			stage.pasteInfo
		);

		apiInstance
			.post("/payments/create", {
				amount: total,
				shipping: {
					name: stage.pasteInfo.recipientName,
					address: {
						...stage.shippingAddress,
					},
				},
			})
			.then(({ data: clientSecret }) => {
				stripe
					.createPaymentMethod({
						type: "card",
						card: cardElement,
						billing_details: {
							name: stage.pasteInfo.nameOnCard,
							email: currentUser.email,
							phone: stage.pasteInfo.phone,
							address: {
								...stage.billingAddress,
							},
						},
						//customer: currentUser.displayName,
					})
					.then(({ paymentMethod }) => {
						console.log(paymentMethod);
						stripe
							.confirmCardPayment(clientSecret, {
								payment_method: paymentMethod.id,
							})
							.then(({ paymentIntent }) => {
								const configOrder = {
									subtotal: total,
									packagingPrice: pricePackage,
									grandTotal: grandTotal,
									orderItems: cartItems.map((item) => {
										const { documentId, productName,productThumbnail, price, quantity } =
											item;
										return {
											documentId,
											productThumbnail,
											productName,
											price,
											quantity,
										};
									}),
								};

								dispatch(saveOrderHistory(configOrder));
							});
					});
			});
	};

	return (
		<div className="container payment">
			<div className="col-12 d-flex flex-row">
				<div className="col-6 bg-white">
					<h1>Detail Order</h1>
					<div className="wrapper-detail">
						<div className="wrapper-detail__headers_1">
							<h3>Subtotal</h3>
							<h3>Shipping Cost</h3>
							<h3>Promo Code</h3>
							<h3>Packaging</h3>
						</div>
						<div className="wrapper-detail__headers_2">
							<h3>{total} грн.</h3>
							<h3> 500 грн.</h3>
							<h3>INDONESIA</h3>
							<h3>{pricePackage} грн.</h3>
						</div>
					</div>
					<div className="wrapper-detail-total">
						<div className="wrapper-detail__headers_1">
							<h3>Grand Total</h3>
						</div>
						<div className="wrapper-detail__headers_2">
							<h2>{grandTotal} грн.</h2>
						</div>
					</div>
				</div>
				<div className="col-6">
					<h1>Order Detail</h1>
					<form onSubmit={sutmitPayment}>
						<div className="wrapper-detail-order">
							<div className="wrapper-detail__headers_1">
								<div className="title">
									<h4>Purchase Date</h4>
								</div>
								<div className="infoOrder">
									<h4>2019-11-07 14:01:48</h4>
								</div>
							</div>
							<div className="wrapper-detail__headers_1">
								<div className="title">
									<h4>Items</h4>
								</div>
								<div className="infoOrder">
									<ul>
										{cartItems.map((data, key) => {
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
							<div className="wrapper-detail__headers_1">
								<div className="title">
									<h4>Name</h4>
								</div>
								<div className="infoOrder">
									<h4>{line1}</h4>
								</div>
							</div>
							<div className="wrapper-detail__headers_1">
								<div className="title">
									<h4>Phone</h4>
								</div>
								<div className="infoOrder">
									<h4>{phoneNumber}</h4>
								</div>
							</div>
							<div className="wrapper-detail__headers_1">
								<div className="title">
									<h4>Email</h4>
								</div>
								<div className="infoOrder">
									<h4>{currentUser.email}</h4>
								</div>
							</div>
							<div className="wrapper-detail__headers_1">
								<div className="title">
									<h4>Shipping Address</h4>
								</div>
								<div className="infoOrder">
									<h4>
										{line1} {line2} {country}, {state}, {city} {country_code}{" "}
										{postal_code}
									</h4>
								</div>
							</div>
							<CardElement options={configCardElement} />
						</div>
						<ButtonForm type="submit">Оплатити</ButtonForm>
					</form>
				</div>
			</div>
		</div>
	);
}

export default Payment;
