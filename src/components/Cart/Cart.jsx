import React, { useState } from "react";
import { useSelector } from "react-redux";

import { selectCartItems } from "../../redux/Carts/cart.selectors";

import { createStructuredSelector } from "reselect";
import { Buttons, ItemRender } from "..";

import { selectCartTotal } from "../../redux/Carts/cart.selectors";
import { Link, useNavigate } from "react-router-dom";
import { useEffect } from "react";

import "./style.scss";

const mapState = createStructuredSelector({
	cartItems: selectCartItems,
	total: selectCartTotal,
});
function Cart() {
	const navigate = useNavigate();
	const { cartItems, total } = useSelector(mapState);
	const [state, setState] = useState(false);

	useEffect(() => {
		if (JSON.stringify(cartItems).indexOf("packageType") > -1) {
			setState(true);
		} else {
			setState(false);
		}
	}, [cartItems]);

	return (
		<section className="cart ">
			{cartItems.length > 0 ? (
				[
					cartItems.map((item, ind) => {
						return <ItemRender {...item} key={ind} />;
					}),
					<div className="wrapper-checkout mt-4">
						<div className="total">
							<h1>Підсумок:</h1>
							<p>{total} грн.</p>
						</div>
						<div
							style={{
								display: "flex",
								flexDirection: "row",
								alignItems: "center",
								justifyContent: "space-around",
								width: "100%",
								marginBottom: "40px",
							}}
						>
							<Link to="/products" className="btn-read w-40 text-center">
								Продовжити покупки
							</Link>
							{state && (
								<Link to="/payment" className="btn-read w-40 text-center">
									Пітвердити замовлення
								</Link>
							)}
						</div>
					</div>,
				]
			) : (
				<p>Немає нічого у вашій корзині</p>
			)}
		</section>
	);
}

export default Cart;
