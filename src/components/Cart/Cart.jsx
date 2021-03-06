import React, { useState } from "react";
import { useSelector } from "react-redux";

import { selectCartItems } from "../../redux/Carts/cart.selectors";

import { createStructuredSelector } from "reselect";
import { Buttons, ItemRender } from "..";

import { selectCartTotal,selectCartItemsCountPrice } from "../../redux/Carts/cart.selectors";
import { Link, useNavigate } from "react-router-dom";
import { useEffect } from "react";

import "./style.scss";
import Emptycart from "../EmptyCart/Emptycart";

const mapState = createStructuredSelector({
	cartItems: selectCartItems,
	packagePrice:selectCartItemsCountPrice,
	total: selectCartTotal,
});

function Cart() {
	const { cartItems, total,packagePrice } = useSelector(mapState);
	const [packegePriceCalc,setPackagePrice] = useState(0);
useEffect(()=>{
	setPackagePrice(cartItems.length > 0 ? packagePrice.reduce((prev,curr)=> prev+curr):0)
},[packagePrice])
	return (
		<section className="cart ">
			{cartItems.length > 0 ? (
				[
					cartItems.map((item, ind) => {
						return <ItemRender {...item} key={ind} />;
					}),
					<div className="wrapper-checkout mt-4" key={0}>
						<div className="total">
							<h1>Підсумок:</h1>
							<p>{total +packegePriceCalc} ₴</p>
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

							<Link to="/payment" className="btn-read w-40 text-center">
								Пітвердити замовлення
							</Link>
						</div>
					</div>,
				]
			) : (
				<Emptycart/>
			)}
		</section>
	);
}

export default Cart;
