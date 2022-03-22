import React, { useEffect } from "react";

import { useParams } from "react-router";
import { useDispatch, useSelector } from "react-redux";

import {
	setCurrentProduct,
	fetchCurrentProductStart,
} from "./../../redux/Products/products.actions";

import { ProductCardRender } from "./../index";

const mapState = (state) => ({
	product: state.productsData.product,
});

const ProductCard = ({ renderState }) => {
	const dispatch = useDispatch();
	const { product } = useSelector(mapState);
	const {productName, productID } = useParams();

	useEffect(() => {
		//dispatch(fetchCurrentProductStart(productID));
		return () => {
			dispatch(setCurrentProduct({}));
		};
	}, []);

	return (
		<div>
			<ProductCardRender {...product} />
		</div>
	);
};

export default ProductCard;
