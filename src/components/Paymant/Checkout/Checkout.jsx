import React, { useState, useEffect } from "react";
import "./style.scss";
import { ButtonForm, FormInput } from "./../../index";
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
} from "./../../../redux/Carts/cart.selectors";
import { createStructuredSelector } from "reselect";
import { useSelector, useDispatch } from "react-redux";
import { apiInstance } from "./../../../utils/utils";
import { clearCart } from "./../../../redux/Carts/cart.actions";
import { useNavigate } from "react-router-dom";
import FormInputPayment from "./../FormInputPayment";
import { saveOrderHistory } from "./../../../redux/Orders/orders.actions";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import { getCode } from "country-list";

import {
	CountryDropdown,
	RegionDropdown,
	CountryRegionData,
} from "react-country-region-selector";
import CountrySelect from "../CountrySelect";

const initialAddressState = {
	line1: "",
	line2: "",
	city: "",
	state: "",
	phoneNumber: "",
	postal_code: "",
	country: "",
	country_code: "",
};

const mapState = createStructuredSelector({
	total: selectCartTotal,
	itemCount: selectCartItemsCount,
	cartItems: selectCartItems,
});

const Checkout = ({ handleChangeState, stage, setStage }) => {
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

	console.log("recipientName", recipientName);
	useEffect(() => {
		if (itemCount < 1) {
			navigate("/dashboard");
		}
	}, [itemCount]);

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
			!recipientName ||
			!nameOnCard
		) {
			return;
		}
	};
	const handleShipping = (evt) => {
		//console.log(evt.target);
		const { name, value } = evt.target;
		setShippingAddress({
			...shippingAddress,
			[name]: value,
		});
	};

	const handleBilling = (evt) => {
		//console.log(evt.target);
		const { name, value } = evt.target;
		setBillingAdress({
			...billingAddress,
			[name]: value,
		});
	};
	// apiInstance
	// 		.post("/payments/create", {
	// 			amount: total * 100,
	// 			shipping: {
	// 				name: recipientName,
	// 				address: {
	// 					...shippingAddress,
	// 				},
	// 			},
	// 		})
	// 		.then(({ data: clientSecret }) => {
	// 			stripe
	// 				.createPaymentMethod({
	// 					type: "card",
	// 					card: cardElement,
	// 					billing_details: {
	// 						name: nameOnCard,
	// 						address: {
	// 							...billingAddress,
	// 						},
	// 					},
	// 				})
	// 				.then(({ paymentMethod }) => {
	// 					stripe
	// 						.confirmCardPayment(clientSecret, {
	// 							payment_method: paymentMethod.id,
	// 						})
	// 						.then(({ paymentIntent }) => {
	// 							const configOrder = {
	// 								orderTotal: total,
	// 								orderItems: cartItems.map((item) => {
	// 									const {
	// 										documentId,
	// 										productThumbnail,
	// 										productName,
	// 										price,
	// 										quantity,
	// 									} = item;
	// 									return {
	// 										documentId,
	// 										productThumbnail,
	// 										productName,
	// 										price,
	// 										quantity,
	// 									};
	// 								}),
	// 							};
	// 							dispatch(saveOrderHistory(configOrder));
	// 						});
	// 				});
	// 		});
	// };

	const selectCountry = (val) => {
		setShippingAddress({
			...shippingAddress,
			country: val,
			country_code: getCode(val).toUpperCase(),
		});
	};
	const selectState = (val) => {
		setShippingAddress({
			...shippingAddress,
			state: val,
		});
	};
	const selectNumber = (val) => {
		setShippingAddress({
			...shippingAddress,
			phoneNumber: `+${val}`,
		});
	};

	const selectCountryBilling = (val) => {
		setBillingAdress({
			...billingAddress,
			country: val,
		});
	};
	const selectStateBilling = (val) => {
		setBillingAdress({
			...billingAddress,
			state: val,
		});
	};
	const selectNumberBilling = (val) => {
		setBillingAdress({
			...billingAddress,
			phoneNumber: `+${val}`,
		});
	};
	
	return (
		<div>
			<form onSubmit={handleFormSubmit} validate>
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
							<CountrySelect name="Country">
								<CountryDropdown
									required
									name="country"
									value={shippingAddress.country}
									onChange={(val) => selectCountry(val)}
								/>
							</CountrySelect>

							<CountrySelect name="State">
								<RegionDropdown
									name="state"
									country={shippingAddress.country}
									value={shippingAddress.state}
									onChange={(val) => selectState(val)}
								/>
							</CountrySelect>

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

							<CountrySelect name="Phone">
								<PhoneInput
									country={shippingAddress.country_code.toLowerCase()}
									defaultCountry={"us"}
									value={shippingAddress.phoneNumber}
									inputProps={{
										name: "phoneNumber",
										required: true,
										autoFocus: true,
									}}
									autocompleteSearch={true}
									onChange={(val) => selectNumber(val)}
								/>
							</CountrySelect>
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
							<CountrySelect name="Country">
								<CountryDropdown
									required
									name="country"
									value={billingAddress.country}
									onChange={(val) => selectCountryBilling(val)}
								/>
							</CountrySelect>

							<CountrySelect name="State">
								<RegionDropdown
									name="state"
									country={billingAddress.country}
									value={billingAddress.state}
									onChange={(val) => selectStateBilling(val)}
								/>
							</CountrySelect>

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
								placeholder="PostalCode"
								value={billingAddress.postal_code}
								name="postal_code"
								Label="Postal Code"
								handleChange={(evt) => handleBilling(evt)}
							/>
						</div>
					</div>
				</div>

				<ButtonForm
					type="submit"
					onClick={(e) =>
						handleChangeState(
							1,
							billingAddress,
							shippingAddress,
							recipientName,
							nameOnCard
						)
					}
				>
					Перейти дальше
				</ButtonForm>
			</form>
		</div>
	);
};

export default Checkout;
