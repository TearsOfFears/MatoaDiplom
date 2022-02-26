import React from "react";
import { PaymantDetails } from "../components";

import { Elements } from "@stripe/react-stripe-js";

import { loadStripe } from "@stripe/stripe-js";

import { publiskKey } from "./../stripe/config";

const stripePromise = loadStripe(publiskKey);

function Paymant() {
	return (
		<Elements stripe={stripePromise}>
			<PaymantDetails />
		</Elements>
	);
}

export default Paymant;
