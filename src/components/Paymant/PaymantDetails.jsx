import React, { useState, useEffect } from "react";
import "./style.scss";
import { ButtonForm, FormInput } from "../index";
import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import {
	selectCartTotal,
	selectCartItemsCount,
	selectCartItems,
} from "../../redux/Carts/cart.selectors";
import CheckoutIcon from "./../../assets/img/cart/Checkout";
import PaymentIcon from "./../../assets/img/cart/Payment";
import ConfirmIcon from "./../../assets/img/cart/Confirm";
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
import Payment from "./Payment/Payment";
import Checkout from "./Checkout/Checkout";
import Confirmation from "./Confirmation/Confirmation";
import {
	CountryDropdown,
	RegionDropdown,
	CountryRegionData,
} from "react-country-region-selector";

const mapState = createStructuredSelector({
	total: selectCartTotal,
	itemCount: selectCartItemsCount,
	cartItems: selectCartItems,
});

const PaymantDetails = () => {
	const stripe = useStripe();
	const elements = useElements();
	const navigate = useNavigate();
	const stageArr = [
		{
			icon: <CheckoutIcon />,
			name: "1. Checkout",
		},
		{
			icon: <PaymentIcon />,
			name: "2. Payment",
		},
		{
			icon: <ConfirmIcon />,
			name: "3. Confirmation",
		},
	];

	const configStage = {
		index: 0,
		billingAddress: {},
		shippingAddress: {},
		pasteInfo: {},
	};

	const [stage, setStage] = useState({ ...configStage });

	const handleChangeState = (key, objBiling, objShipping, pasteInfo) => {
		// if (
		// 	Object.keys(objBiling).length === 0 &&
		// 	Object.keys(objShipping).length === 0 &&
		// 	Object.keys(pasteInfo).length === 0
		// ) {
		// 	setStage({
		// 		...configStage,
		// 		index: 0,
		// 		billingAddress: objBiling,
		// 		shippingAddress: objShipping,
		// 		pasteInfo: pasteInfo,
		// 	});
		// }else 
		// {
			setStage({
				...configStage,
				index: key,
				billingAddress: objBiling,
				shippingAddress: objShipping,
				pasteInfo: pasteInfo,
			});
		
	};

	const configDetails = {
		handleChangeState,
		stage,
	};

	const renderStages = [
		{
			stage: <Checkout {...configDetails} />,
		},
		{
			stage: <Payment {...configDetails} />,
		},
		{
			stage: <Confirmation {...configDetails} />,
		},
	];

	return (
		<div className="paymantDetails d-flex flex-column align-items-center">
			<div className=" paymentStages col-7 d-flex flex-row justify-content-between">
				{stageArr.map((obj, key) => {
					const { icon, name } = obj;
					return (
						<div
							className={stage.index === key ? "activeStage" : ""}
							key={key}
							onClick={(e) =>
								handleChangeState(
									key,
									stage.billingAddress,
									stage.shippingAddress,
									stage.pasteInfo
								)
							}
						>
							{icon}
							<h3>{name}</h3>
						</div>
					);
				})}
			</div>
			{renderStages.map((stages, key) => {
				return (
					<div key={key} className={stage.index === key ? "show" : "hide"}>
						{stages.stage}
					</div>
				);
			})}
		</div>
	);
};
export default PaymantDetails;
