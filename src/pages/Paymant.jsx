import React from "react";
import { PaymantDetails } from "../components";

import { Elements, StripeProvider } from "@stripe/react-stripe-js";

import { loadStripe } from "@stripe/stripe-js";

import { publishKey } from "./../stripe/config";

const stripePromise = loadStripe(publishKey);

function Paymant() {
	return (
		<Elements stripe={stripePromise}>
			<PaymantDetails />
		</Elements>
	);
}

export default Paymant;
