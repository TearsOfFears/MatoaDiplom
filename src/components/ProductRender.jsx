import React from "react";

import { Link } from "react-router-dom";

import { useDispatch } from "react-redux";

import { addProduct } from "../redux/Carts/cart.actions";

const ProductRender = (product) => {
	const dispatch = useDispatch();
	const { ind, productThumbnail, productName, price, documentId } = product;

	const handleAddToCart = (product) => {
		if (!product) return;
		dispatch(addProduct(product));
	};

	if (
		!productThumbnail ||
		!documentId ||
		!productName ||
		typeof price === "undefined"
	)
		return null;
	return (
		<div className="wrapper-products__item" key={ind}>
			<div className="img-border">
				<img src={productThumbnail} alt={productThumbnail} />
			</div>
			<p className="titleProduct">{productName}</p>
			<hr />
			<p className="price">Ціна: {price} грн.</p>
			<Link to={`/product/${documentId}`} className="btn-product">
				Переглянути подробиці
			</Link>
			<button className="btn-product" onClick={() => handleAddToCart(product)}>
				Добавити до кошика
			</button>
		</div>
	);
};

export default ProductRender;
