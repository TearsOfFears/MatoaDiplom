import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
	addProduct,
	reduceCartItem,
} from "./../../../redux/Carts/cart.actions";
import { createStructuredSelector } from "reselect";
import {
	selectCartTotal,
	selectCartItemsCount,
} from "./../../../redux/Carts/cart.selectors";
import "./addToCart.scss";
import { useNavigate } from "react-router-dom";
import Animate from "animate";

import classnames from "classnames";
const ProductSection = (product) => {
	const dispatch = useDispatch();
	const navigate = useNavigate();

	const { productName, price, productThumbnail } = product || [];

	const handleAddToCart = (product) => {
		if (!product) return;
		dispatch(addProduct(product));
		navigate("/cart");
	};
	const [state, setstate] = useState();
	const [stateStyle, setstateStyle] = useState({ fade: false });
	const getLink = (link) => {
		setstate(link);
		setstateStyle({ fade: true });
	};
	useEffect(() => {
		setstate(productThumbnail);
	}, [product]);

	return (
		<section className="addToCart">
			<div className="bg-second-accent"></div>
			<div className="container">
				<div className="row">
					<div className="container-min">
						<div className="wrapper-addToCart">
							<div className="wrapper-addToCart-images-wrapper">
								<div className="wrapper-addToCart-images-wrapper__hover">
									{Array.isArray(productThumbnail) &&
										productThumbnail.map((link, id) => {
											return (
												<img
													src={link}
													key={id}
													alt="link"
													className=""
													onClick={(e) => getLink(link)}
												/>
											);
										})}
								</div>
								<div className="wrapper-addToCart-images-wrapper__active">
									<img
										src={state}
										alt=""
										id="image"
										onAnimationEnd={() => setstateStyle({ fade: false })}
										className={stateStyle.fade ? "imgAnimate" : ""}
									/>
								</div>
							</div>

							<div className="wrapper-addToCart__info">
								<h1>{productName}</h1>
								<strike>{price} грн.</strike>
								<h2>{price} грн. </h2>
								<div className="block-add">
									<a
										className="btn-read"
										onClick={() => handleAddToCart(product)}
									>
										Add to cart
									</a>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</section>
	);
};

export default ProductSection;
