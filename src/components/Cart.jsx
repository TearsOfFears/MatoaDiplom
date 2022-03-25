import React from "react";
import { useSelector } from "react-redux";

import { selectCartItems } from "../redux/Carts/cart.selectors";

import { createStructuredSelector } from "reselect";
import { Buttons, ItemRender } from ".";

import { selectCartTotal } from "../redux/Carts/cart.selectors";
import { Link, useNavigate } from "react-router-dom";
import { useEffect } from "react";

const mapState = createStructuredSelector({
	cartItems: selectCartItems,
	total: selectCartTotal,
});

const mapState2 = ({ user }) => ({ user: user.currentUser });

function Cart() {
	const navigate = useNavigate();
	const { cartItems, total } = useSelector(mapState);
	const { user } = useSelector(mapState2);

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
						<Link to="/payment" className="btn-read w-100 text-center">
							Пітвердити замовлення
						</Link>
						<Link to="/products" className="btn-read w-100 text-center">
							Продовжити покупки
						</Link>
					</div>,
				]
			) : (
				<p>Немає нічого у вашій корзині</p>
			)}
		</section>
	);
}

export default Cart;
