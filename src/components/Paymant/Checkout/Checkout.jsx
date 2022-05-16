import React, { useState, useEffect } from "react";
import "./style.scss";
import { ButtonForm } from "./../../index";
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
import { useNavigate } from "react-router-dom";
import FormInputPayment from "./../FormInputPayment";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import postcode from "postcode-validator";

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
	postal_code: "",
	country: "",
};
const initalPasteInfo = {
	recipientName: "",
	nameOnCard: "",
	phone: "",
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
	const [show, setShow] = useState(false);
	const [billingAddress, setBillingAdress] = useState({
		...initialAddressState,
	});
	const [shippingAddress, setShippingAddress] = useState({
		...initialAddressState,
	});

	const [pasteInfo, setPasteInfo] = useState({
		...initalPasteInfo,
	});

	const [recipientName, setRecipientName] = useState("");
	const [nameOnCard, setnameOnCard] = useState("");
	const [phone, setPhone] = useState("");

	const handleFormSubmit = async (e) => {
		e.preventDefault();
		const cardElement = elements.getElement("card");

		if (
			!postcode.validate(
				shippingAddress.postal_code,
				shippingAddress.country
			) ||
			!postcode.validate(billingAddress.postal_code, billingAddress.country)
		) {
			alert("Перевірте коректність введеної пошти");
			handleChangeState(0, billingAddress, shippingAddress, pasteInfo);
		}
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

	const selectCountry = (val) => {
		setShippingAddress({
			...shippingAddress,
			country: val,
		});
	};
	const selectState = (val) => {
		setShippingAddress({
			...shippingAddress,
			state: val,
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

	const handlePasteInfo = (evt) => {
		const { name, value } = evt.target;
		setPasteInfo({
			...pasteInfo,
			[name]: value,
		});
	};

	const selectNumber = (val) => {
		setPasteInfo({
			...pasteInfo,
			["phone"]: `+${val}`,
		});
	};
	useEffect(() => {
		if (
			!Object.values(shippingAddress).includes("") &&
			!Object.values(billingAddress).includes("")
		) {
			setShow(true);
		} else {
			setShow(false);
		}
	}, [shippingAddress, billingAddress]);
	//console.log(postcode.validate('4602', 'UA'));
	return (
		<div>
			<form onSubmit={handleFormSubmit}>
				<div className="col-12 ">
					<div className="col-6">
						<h2>Адреса відправки</h2>
						<div className="group">
							<FormInputPayment
								required
								type="text"
								placeholder="Напр: Хмельницький Назар Іванович"
								value={pasteInfo.recipientName}
								name="recipientName"
								Label="Повне ім`я отримувача"
								handleChange={(e) => handlePasteInfo(e)}
							/>
							<FormInputPayment
								required
								type="text"
								placeholder="Адреса 1"
								value={shippingAddress.line1}
								name="line1"
								Label="Адреса 1"
								handleChange={(evt) => handleShipping(evt)}
							/>
							<FormInputPayment
								required
								type="text"
								placeholder="Адреса 1"
								value={shippingAddress.line2}
								name="line2"
								Label="Адреса 2"
								handleChange={(evt) => handleShipping(evt)}
							/>
							<CountrySelect name="Країна">
								<CountryDropdown
									required
									name="country"
									valueType="short"
									value={shippingAddress.country}
									onChange={(val) => selectCountry(val)}
								/>
							</CountrySelect>

							<CountrySelect name="Область">
								<RegionDropdown
									required
									name="state"
									countryValueType="short"
									country={shippingAddress.country}
									value={shippingAddress.state}
									onChange={(val) => selectState(val)}
								/>
							</CountrySelect>
							<div className="d-flex flex-row justify-content-between align-items-center">
								<div className="w-45">
									<FormInputPayment
										required
										type="text"
										placeholder="Місто"
										value={shippingAddress.city}
										name="city"
										Label="Місто"
										handleChange={(evt) => handleShipping(evt)}
									/>
								</div>
								<div className="w-45">
									<FormInputPayment
										required
										type="text"
										placeholder="46042"
										maxlengthVal="5"
										value={shippingAddress.postal_code}
										name="postal_code"
										Label="Поштовий індекс"
										handleChange={(evt) => handleShipping(evt)}
									/>
								</div>
							</div>

							<CountrySelect name="Номер телефону">
								<PhoneInput
									required
									country={shippingAddress.country.toLowerCase()}
									defaultCountry={"us"}
									value={phone}
									name="phone"
									inputProps={{
										name: "phone",
										required: true,
										autoFocus: true,
									}}
									autocompleteSearch={true}
									onChange={(evt) => selectNumber(evt)}
								/>
							</CountrySelect>
						</div>
					</div>
					<div className="col-6">
						<h2>Адреса оплати</h2>
						<div className="group">
							<FormInputPayment
								required
								type="text"
								placeholder="Напр: Косар Дмитро"
								value={pasteInfo.nameOnCard}
								name="nameOnCard"
								Label="Ім`я на карті"
								handleChange={(e) => handlePasteInfo(e)}
							/>
							<FormInputPayment
								required
								type="text"
								placeholder="Адреса 1"
								value={billingAddress.line1}
								name="line1"
								Label="Адреса 1"
								handleChange={(evt) => handleBilling(evt)}
							/>
							<FormInputPayment
								required
								type="text"
								placeholder="Адреса 2"
								value={billingAddress.line2}
								name="line2"
								Label="Адреса 2"
								handleChange={(evt) => handleBilling(evt)}
							/>
							<CountrySelect name="Країна">
								<CountryDropdown
									required
									name="country"
									valueType="short"
									value={billingAddress.country}
									onChange={(val) => selectCountryBilling(val)}
								/>
							</CountrySelect>

							<CountrySelect name="Область">
								<RegionDropdown
									required
									name="state"
									countryValueType="short"
									country={billingAddress.country}
									value={billingAddress.state}
									onChange={(val) => selectStateBilling(val)}
								/>
							</CountrySelect>

							<FormInputPayment
								required
								type="text"
								placeholder="Місто"
								value={billingAddress.city}
								name="city"
								Label="Місто"
								handleChange={(evt) => handleBilling(evt)}
							/>
							<FormInputPayment
								required
								type="text"
								placeholder="45603"
								value={billingAddress.postal_code}
								name="postal_code"
								Label="Поштовий індекс"
								maxlengthVal="5"
								handleChange={(evt) => handleBilling(evt)}
							/>
						</div>
					</div>
				</div>
				<ButtonForm
					style="mb-5"
					type="submit"
					disabled={!show}
					onClick={(e) =>
						handleChangeState(1, billingAddress, shippingAddress, pasteInfo)
					}
				>
					{show ? "Перейти дальше" : `Заповніть всі поля`}
				</ButtonForm>
			</form>
		</div>
	);
};

export default Checkout;
