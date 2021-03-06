import React, { useState, useEffect } from "react";
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
import {
	getUserOrderHistory,
	saveOrderHistory,
} from "../../../redux/Orders/orders.actions";
import { ButtonForm } from "../..";
import ModalError from "../../ModalError/ModalError";
import { Button } from "@material-ui/core";
import axios from "axios";

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
	const [isProcessing, setProcessingTo] = useState(false);
	const [checkoutError, setCheckoutError] = useState();

	const stripe = useStripe();
	const [hideModal, setHideModal] = useState(true);

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

	let pricePackage = calcPrice.reduce((prev, current) => prev + current, 0);

	const handleCardDetailsChange = (ev) => {
		ev.error ? setCheckoutError(ev.error.message) : setCheckoutError();
	};

	let grandTotal = total + 100 + pricePackage;
	const { email } = currentUser || {};

	const sutmitPayment = async (evt) => {
		evt.preventDefault(); //Блокує перезавантаження сторінки, при нажаті кнопки
		setProcessingTo(true); //Змінюєм стан кнопки для користувача
		const cardElement = elements.getElement("card"); //отримуємо дані з поля заповнення картки
		const { data: clientSecret } = await apiInstance.post("/payments/create", {
			//робимо запрос до сервера, та надисажє
			amount: grandTotal * 100,
			shipping: {
				name: stage.pasteInfo.recipientName,
				phone: stage.pasteInfo.phone,
				address: {
					...stage.shippingAddress,
				},
			},
		});
		const paymentMethodReq = await stripe.createPaymentMethod({
			//створюємо запит до сервісу Stripe,та надаємо нижчне наведенну інформацію
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
		});
		if (paymentMethodReq.error) {//ловимо помилки
			setCheckoutError(paymentMethodReq.error.message); //вставляємо повідомлення помилки
			setProcessingTo(false); //забороняємо нажиття кнопки для користувача
			return;
		}
		const { error } = await stripe.confirmCardPayment(clientSecret, {
			//ловимо помилки
			payment_method: paymentMethodReq.paymentMethod.id,
		});
		if (error) {//ловимо помилки
			setCheckoutError(error.message); //вставляємо повідомлення помилки
			setProcessingTo(false); //забороняємо нажиття кнопки для користувача
			return;
		} else {
			const configOrder = {//створюєм об`єкт для збереження даних
				
				subtotal: total,
				packagingPrice: pricePackage,
				grandTotal: grandTotal,
				shippingAddress: stage.shippingAddress,
				billingAddress: stage.billingAddress,
				name: stage.pasteInfo.nameOnCard,
				email: currentUser.email,
				phone: stage.pasteInfo.phone,
				activity: { value: "Processing", label: "В обробці" },
				orderItems: cartItems.map((item) => {
					//створюємо об`єкт всередині документа для конфігурування товарів
					const {
						documentId,
						productName,
						productThumbnail,
						price,
						quantity,
						packageType,
					} = item;
					return {
						documentId,
						productThumbnail,
						productName,
						price,
						packageType,
						quantity,
					};
				}),
			};
			dispatch(saveOrderHistory(configOrder));//передаємо вище створений об`єкт в локальне сховище та надсиоаємо до Firebase
			dispatch(getUserOrderHistory(currentUser.id));//отримуємо замовлення користувача для віображення у
		}

		if (!isProcessing) {
			handleChangeState(
				2,
				stage.billingAddress,
				stage.shippingAddress,
				stage.pasteInfo
			);
		}
	};

	useEffect(() => {
		if (checkoutError) {
			setHideModal(!hideModal);
		}
	}, [checkoutError]);
	const configModal = {
		hideModal,
		setHideModal,
		isProcessing,
		checkoutError,
		setCheckoutError,
	};
	return (
		<div className="container payment">
			<ModalError {...configModal} />

			<div className="col-12">
				<div className="col-6 bg-white">
					<h1>Замовлення</h1>
					<div className="wrapper-detail">
						<div className="wrapper-detail__headers_1">
							<h3>Проміжна сума</h3>
							<h3>Вартість доставки</h3>

							<h3>Упаковка</h3>
						</div>
						<div className="wrapper-detail__headers_2">
							<h3>{total} ₴</h3>
							<h3> ~100 ₴</h3>

							<h3>{pricePackage} ₴</h3>
						</div>
					</div>
					<div className="wrapper-detail-total">
						<div className="wrapper-detail__headers_1">
							<h3>Загальна сума</h3>
						</div>
						<div className="wrapper-detail__headers_2">
							<h2>{grandTotal} ₴</h2>
						</div>
					</div>
				</div>
				<div className="col-6">
					<h1>Деталі замовлення</h1>
					<form onSubmit={sutmitPayment}>
						<div className="wrapper-detail-order">
							<div className="wrapper-detail__headers_1">
								<div className="title">
									<h4>Предмети</h4>
								</div>
								<div className="infoOrder">
									<ul>
										{cartItems.map((data, key) => {
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
							<div className="wrapper-detail__headers_1">
								<div className="title">
									<h4>Ім`я</h4>
								</div>
								<div className="infoOrder">
									<h4>{line1}</h4>
								</div>
							</div>
							<div className="wrapper-detail__headers_1">
								<div className="title">
									<h4>Телефон</h4>
								</div>
								<div className="infoOrder">
									<h4>{stage.pasteInfo.phone}</h4>
								</div>
							</div>
							<div className="wrapper-detail__headers_1">
								<div className="title">
									<h4>Е-пошта</h4>
								</div>
								<div className="infoOrder">
									<h4>{email}</h4>
								</div>
							</div>
							<div className="wrapper-detail__headers_1">
								<div className="title">
									<h4>Адреса відправки</h4>
								</div>
								<div className="infoOrder">
									<h4>
										{line1} {line2} {country}, {state}, {city} {country_code}{" "}
										{postal_code}
									</h4>
								</div>
							</div>
							<CardElement
								options={configCardElement}
								onChange={handleCardDetailsChange}
							/>
						</div>

						<ButtonForm type="submit" disabled={isProcessing || !stripe}>
							{isProcessing ? "Йде оплата..." : `Оплатити`}
						</ButtonForm>
					</form>
				</div>
			</div>
		</div>
	);
}

export default Payment;
