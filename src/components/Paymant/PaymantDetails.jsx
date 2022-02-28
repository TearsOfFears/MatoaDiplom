import React, { useState, useEffect } from "react";
import "./style.scss";
import { CountryDropdown } from "react-country-region-selector";
import { ButtonForm, FormInput } from "../index";
import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import {
	selectCartTotal,
	selectCartItemsCount,
	selectCartItems,
} from "../../redux/Carts/cart.selectors";
import { createStructuredSelector } from "reselect";
import { useSelector, useDispatch } from "react-redux";
import { apiInstance } from "../../utils/utils";
import { clearCart } from "../../redux/Carts/cart.actions";
import { useNavigate } from "react-router-dom";

import { saveOrderHistory } from "../../redux/Orders/orders.actions";

const initialAddressState = {
	line1: "",
	line2: "",
	city: "",
	state: "",
	postal_code: "",
	country: "",
};

const mapState = createStructuredSelector({
	total: selectCartTotal,
	itemCount: selectCartItemsCount,
	cartItems: selectCartItems,
});
const PaymantDetails = () => {
	const stripe = useStripe();
	const elements = useElements();
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const { total, itemCount, cartItems } = useSelector(mapState);
	const [billingAddress, setBillingAdress] = useState({
		...initialAddressState,
	});
	const [shippingAddress, setShippingAddress] = useState({
		...initialAddressState,
	});
	const [recipientName, setRecipientName] = useState("");
	const [nameOnCard, setnameOnCard] = useState("");

	useEffect(() => {
		if (itemCount < 1) {
			navigate("/dashboard");
		}
	}, [itemCount]);
	console.log(cartItems);
	const handleFormSubmit = async (e) => {
		e.preventDefault();
		const cardElement = elements.getElement("card");

		if (
			!shippingAddress.line1 ||
			!shippingAddress.city ||
			!shippingAddress.postal_code ||
			!shippingAddress.country ||
			!billingAddress.city ||
			!billingAddress.state ||
			!billingAddress.postal_code ||
			!billingAddress.country ||
			!recipientName ||
			!nameOnCard
		) {
			return;
		}

		apiInstance
			.post("/payments/create", {
				amount: total * 100,
				shipping: {
					name: recipientName,
					address: {
						...shippingAddress,
					},
				},
			})
			.then(({ data: clientSecret }) => {
				stripe
					.createPaymentMethod({
						type: "card",
						card: cardElement,
						billing_details: {
							name: nameOnCard,
							address: {
								...billingAddress,
							},
						},
					})
					.then(({ paymentMethod }) => {
						stripe
							.confirmCardPayment(clientSecret, {
								payment_method: paymentMethod.id,
							})
							.then(({ paymentIntent }) => {
								const configOrder = {
									orderTotal: total,
									orderItems: cartItems.map((item) => {
										const {
											documentId,
											productThumbnail,
											productName,
											price,
											quantity,
										} = item;
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
	const handleShipping = (evt) => {
		const { name, value } = evt.target;
		setShippingAddress({
			...shippingAddress,
			[name]: value,
		});
	};

	const handleBilling = (evt) => {
		const { name, value } = evt.target;
		setBillingAdress({
			...billingAddress,
			[name]: value,
		});
	};

	const configCardElement = {
		iconStyle: "solid",
		style: {
			base: {
				fontSize: "16px",
			},
		},
		hidePostalCode: true,
	};

	return (
		<div className="paymantDetails">
			<form onSubmit={handleFormSubmit}>
				<h2>Shipping address</h2>
				<div className="group">
					<FormInput
						required
						type="text"
						placeholder="Pecipient Name"
						value={recipientName}
						name="recipientName"
						handleChange={(e) => setRecipientName(e.target.value)}
					/>
					<FormInput
						required
						type="text"
						placeholder="Line 1"
						handleChange={(evt) => handleShipping(evt)}
						value={shippingAddress.line1}
						name="line1"
					/>
					<FormInput
						required
						type="text"
						placeholder="Line 2"
						handleChange={(evt) => handleShipping(evt)}
						value={shippingAddress.line2}
						name="line2"
					/>
					<div className="formRow chekoutInput">
						<CountryDropdown
							required
							valueType="short"
							value={shippingAddress.country}
							onChange={(val) =>
								handleShipping({
									target: {
										name: "country",
										value: val,
									},
								})
							}
							handleChange={(evt) => handleShipping(evt)}
							name="country"
						/>
					</div>
					<FormInput
						required
						type="text"
						placeholder="City"
						value={shippingAddress.city}
						name="city"
						handleChange={(evt) => handleShipping(evt)}
					/>
					<FormInput
						required
						type="text"
						placeholder="State"
						value={shippingAddress.state}
						name="state"
						handleChange={(evt) => handleShipping(evt)}
					/>
					<FormInput
						required
						type="text"
						placeholder="PostalCode"
						value={shippingAddress.postal_code}
						name="postal_code"
						handleChange={(evt) => handleShipping(evt)}
					/>
				</div>
				<h2>Billing address</h2>
				<div className="group">
					<FormInput
						required
						type="text"
						placeholder="Name on card"
						value={nameOnCard}
						name="nameOnCard"
						handleChange={(e) => setnameOnCard(e.target.value)}
					/>
					<FormInput
						required
						type="text"
						placeholder="Line 1"
						value={billingAddress.line1}
						handleChange={(evt) => handleBilling(evt)}
						name="line1"
					/>
					<FormInput
						required
						type="text"
						placeholder="Line 2"
						value={billingAddress.line2}
						handleChange={(evt) => handleBilling(evt)}
						name="line2"
					/>
					<div className="formRow chekoutInput">
						<CountryDropdown
							required
							valueType="short"
							value={billingAddress.country}
							onChange={(val) =>
								handleBilling({
									target: {
										name: "country",
										value: val,
									},
								})
							}
							handleChange={(evt) => handleBilling(evt)}
							name="country"
						/>
					</div>
					<FormInput
						required
						type="text"
						placeholder="City"
						value={billingAddress.city}
						handleChange={(evt) => handleBilling(evt)}
						name="city"
					/>
					<FormInput
						required
						type="text"
						placeholder="State"
						value={billingAddress.state}
						handleChange={(evt) => handleBilling(evt)}
						name="state"
					/>
					<FormInput
						required
						type="text"
						placeholder="PostalCode"
						value={billingAddress.postal_code}
						handleChange={(evt) => handleBilling(evt)}
						name="postal_code"
					/>
				</div>
				<div className="group">
					<h2>Cart Details</h2>
					<CardElement options={configCardElement} />
				</div>
				<ButtonForm type="submit">Оплатити зараз</ButtonForm>
			</form>
		</div>
	);
};
export default PaymantDetails;
