import React from "react";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addProduct } from "./../../redux/Carts/cart.actions";
import Skeleton from "./Skeleton";
import { useNavigate } from "react-router";
import {
	LazyLoadImage,
	trackWindowScroll,
} from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";
import Loader from "../Loader/Loader";

const ProductRender = (product) => {
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const { ind, productThumbnail, productName, price, documentId } = product;

	const handleAddToCart = (product) => {
		if (!product) return;
		dispatch(addProduct(product));
		navigate("/cart");
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
				<LazyLoadImage
					effect="blur"
					useIntersectionObserver={true}
					placeholder={<Loader />}
					src={productThumbnail[0]}
					width="250px"
					wrapperClassName="text-center"
				/>
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
