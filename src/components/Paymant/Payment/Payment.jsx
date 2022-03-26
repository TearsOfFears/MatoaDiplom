import React from "react";
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

import { useSelector, useDispatch } from "react-redux";

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

	const { currentUser, cartDataAll } = useSelector(mapState);
	const { total, itemCount, cartItems, calcPrice } = useSelector(mapStateItems);

	const configCardElement = {
		iconStyle: "solid",
		style: {
			base: {
				fontSize: "16px",
			},
		},
		hidePostalCode: true,
	};
	// console.log(stage.billingAddress);
	// console.log(stage.shippingAddress);
	const {} = stage.shippingAddress || {};
	const {} = stage.billingAddress || {};

	// let check = cartDataAll.map((data, key) => {
	// 	 data.reduce(
	// 		(cartDataAll, cartItem) =>
	// 			cartDataAll.quantity * cartItem.packageType.price,
	// 		1
	// 	);
	// });
	console.log(calcPrice);
	console.log(cartDataAll);
	const { packageType, documentId } = cartDataAll[0];
	//console.log(packageType);
	let grandTotal = 0;
	grandTotal = total + 500 + 50;
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
							<h3>50 грн.</h3>
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
					<div className="wrapper-detail-order">
						<div className="wrapper-detail__headers_1">
							<div className="title">
								<h4>Order Number</h4>
							</div>
							<div className="infoOrder">
								<h4>MTAWEB-3A86D4DB</h4>
							</div>
						</div>
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
								<h4>Way Kambas Mini Ebony</h4>
								<p>2 x IDR 1.024.000 </p>
								<h4>Sikka (Ebony & Mapple)</h4>
								<p>1 x IDR 1.264.000</p>
							</div>
						</div>
						<div className="wrapper-detail__headers_1">
							<div className="title">
								<h4>Name</h4>
							</div>
							<div className="infoOrder">
								<h4>Rasyidin Arsyad Nasution</h4>
							</div>
						</div>
						<div className="wrapper-detail__headers_1">
							<div className="title">
								<h4>Phone</h4>
							</div>
							<div className="infoOrder">
								<h4>+18911188899</h4>
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
								<h4>18 Richardson Drive Fountain Valley, CA 92708</h4>
							</div>
						</div>
						<CardElement options={configCardElement} />
					</div>
				</div>
			</div>
			Payment <button onClick={(e) => handleChangeState(2)}> Next</button>
		</div>
	);
}

export default Payment;
