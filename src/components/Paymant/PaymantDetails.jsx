import React, { useState, useEffect } from "react";
import "./style.scss";
//import { CountryDropdown } from "react-country-region-selector";
import { ButtonForm, FormInput } from "../index";
import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import {
	selectCartTotal,
	selectCartItemsCount,
	selectCartItems,
} from "../../redux/Carts/cart.selectors";
import Checkout from "./../../assets/img/cart/Checkout";
import Payment from "./../../assets/img/cart/Payment";
import Confirm from "./../../assets/img/cart/Confirm";
import { createStructuredSelector } from "reselect";
import { useSelector, useDispatch } from "react-redux";
import { apiInstance } from "../../utils/utils";
import { clearCart } from "../../redux/Carts/cart.actions";
import { useNavigate } from "react-router-dom";
import FormInputPayment from "./FormInputPayment";
import { saveOrderHistory } from "../../redux/Orders/orders.actions";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import { getCode } from "country-list";

import {
	CountryDropdown,
	RegionDropdown,
	CountryRegionData,
} from "react-country-region-selector";

const initialAddressState = {
	line1: "",
	line2: "",
	city: "",
	state: "",
	phoneNumber: "",
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

	const [number, setNumber] = useState("");

	useEffect(() => {
		if (itemCount < 1) {
			navigate("/dashboard");
		}
	}, [itemCount]);
	let countryCode;
	if (
		typeof shippingAddress.country === "string" &&
		shippingAddress.country.length > 0
	) {
		countryCode = getCode(shippingAddress.country).toLowerCase();
	}

	const handleFormSubmit = async (e) => {
		e.preventDefault();
		const cardElement = elements.getElement("card");

		if (
			!shippingAddress.line1 ||
			!shippingAddress.city ||
			!shippingAddress.postal_code ||
			!shippingAddress.country ||
			!shippingAddress.phoneNumber ||
			!billingAddress.city ||
			!billingAddress.state ||
			!billingAddress.postal_code ||
			!billingAddress.country ||
			!billingAddress.phoneNumber ||
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
		//console.log(evt.target);
		const { name, value } = evt.target;
		setShippingAddress({
			...shippingAddress,
			[name]: value,
		});
	};

	console.log(shippingAddress);

	const handleBilling = (evt) => {
		//console.log(evt.target);
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
	const selectCountry = (val) => {
		setShippingAddress({ ...shippingAddress, country: val });
	};
	const selectState = (val) => {
		setShippingAddress({ ...shippingAddress, state: val });
	};
	const selectNumber = (val) => {
		setShippingAddress({ ...shippingAddress, phoneNumber: `+${val}`  });
	};
	console.log(shippingAddress);
	return (
		<div className="paymantDetails d-flex flex-column align-items-center">
			<div className=" paymentStages col-7 d-flex flex-row justify-content-between">
				<div className="activeStage">
					<Checkout />
					<h3>1. Checkout</h3>
				</div>
				<div className="activeStage">
					<Payment />
					<h3>2. Payment</h3>
				</div>
				<div className="activeStage">
					<Confirm />
					<h3>3. Confirmation</h3>
				</div>
			</div>

			<form onSubmit={handleFormSubmit}>
				<div className="col-12">
					<div className="col-6">
						<h2>Shipping address</h2>
						<div className="group">
							<FormInputPayment
								required
								type="text"
								placeholder="Ex: Rasyidin Arsyad Nasution"
								value={recipientName}
								name="recipientName"
								Label="Pecipient Name"
								handleChange={(e) => setRecipientName(e.target.value)}
							/>
							<FormInputPayment
								required
								type="text"
								placeholder="Line 1"
								value={shippingAddress.line1}
								name="line1"
								Label="Line 1"
								handleChange={(evt) => handleShipping(evt)}
							/>
							<FormInputPayment
								required
								type="text"
								placeholder="Line 2"
								value={shippingAddress.line2}
								name="line2"
								Label="Line 2"
								handleChange={(evt) => handleShipping(evt)}
							/>
							<div className="countrySelect">
								<label> Country</label>
								<CountryDropdown
									required
									name="country"
									value={shippingAddress.country}
									onChange={(val) => selectCountry(val)}
								/>
							</div>
							<div className="countrySelect">
								<label>State</label>
								<RegionDropdown
									name="state"
									country={shippingAddress.country}
									value={shippingAddress.state}
									onChange={(val) => selectState(val)}
								/>
							</div>
							<FormInputPayment
								required
								type="text"
								placeholder="City"
								value={shippingAddress.city}
								name="city"
								Label="City"
								handleChange={(evt) => handleShipping(evt)}
							/>
							<FormInputPayment
								required
								type="text"
								placeholder="PostalCode"
								value={shippingAddress.postal_code}
								name="postal_code"
								Label="Postal Code"
								handleChange={(evt) => handleShipping(evt)}
							/>
							<PhoneInput
								country={countryCode}
								defaultCountry={"us"}
								value={shippingAddress.phoneNumber}
								inputProps={{
									name: "phoneNumber",
									required: true,
									autoFocus: true,
								}}
								onChange={(val) => selectNumber(val)}
							/>
						</div>
					</div>

					<div className="col-6">
						<h2>Billing address</h2>
						<div className="group">
							<FormInputPayment
								required
								type="text"
								placeholder="Name on card"
								value={nameOnCard}
								name="nameOnCard"
								Label="Name on card"
								handleChange={(e) => setnameOnCard(e.target.value)}
							/>
							<FormInputPayment
								required
								type="text"
								placeholder="Line 1"
								value={billingAddress.line1}
								name="line1"
								Label="Line 1"
								handleChange={(evt) => handleBilling(evt)}
							/>
							<FormInputPayment
								required
								type="text"
								placeholder="Line 2"
								value={billingAddress.line2}
								name="line2"
								Label="Line 2"
								handleChange={(evt) => handleBilling(evt)}
							/>
							<div className="countrySelect">
								<label> Country</label>
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
							<FormInputPayment
								required
								type="text"
								placeholder="City"
								value={billingAddress.city}
								name="city"
								Label="City"
								handleChange={(evt) => handleBilling(evt)}
							/>
							<FormInputPayment
								required
								type="text"
								placeholder="State"
								value={billingAddress.state}
								name="state"
								Label="State"
								handleChange={(evt) => handleBilling(evt)}
							/>
							<FormInputPayment
								required
								type="text"
								placeholder="PostalCode"
								value={billingAddress.postal_code}
								name="postal_code"
								Label="Postal Code"
								handleChange={(evt) => handleBilling(evt)}
							/>
						</div>
					</div>
				</div>
				<div className="col-3">
					<div className="group">
						<h2>Cart Details</h2>
						<CardElement options={configCardElement} />
					</div>
					<ButtonForm type="submit">Оплатити зараз</ButtonForm>
				</div>
			</form>
		</div>
	);
};
export default PaymantDetails;
