import React from "react";
import { Link } from "react-router-dom";

import { Header } from "../components";
import MainLayout from "../Layouts/MainLayout";

function Cart() {
	return (
		<div className="Cart">
			<MainLayout>
				<Link to="/"> Back</Link>
			</MainLayout>
		</div>
	);
}

export default Cart;
