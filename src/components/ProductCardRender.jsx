import React from "react";
import { Link } from "react-router-dom";
import { addProduct } from "../redux/Carts/cart.actions";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router";
const ProductCardRender = (product) => {
	const { productName, productThumbnail, price, productDesc } = product;
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const handleAddToCart = (product) => {
		if (!product) return;
		dispatch(addProduct(product));
		navigate("/cart");
	};

	return (
		<div>
			<h1>{productName}</h1>
			<h1>{price} грн.</h1>
			<img src={productThumbnail} alt="" />
			<div dangerouslySetInnerHTML={{ __html: productDesc }} />

			<button className="btn" onClick={() => handleAddToCart(product)}>
				Добавити до кошик
			</button>
		</div>
	);
};

export default ProductCardRender;
