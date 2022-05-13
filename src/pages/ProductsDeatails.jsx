import React from "react";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useParams } from "react-router";

import { ProductCard } from "../components";
import { fetchCurrentProductStart } from "../redux/Products/products.actions";

const ProductsDeatails = () => {
	const { productName } = useParams();
	const dispatch = useDispatch()
	useEffect(() => {
		dispatch(fetchCurrentProductStart({ productName }));
	}, []);
	return (
		<div>
			<ProductCard />
		</div>
	);
};

export default ProductsDeatails;
