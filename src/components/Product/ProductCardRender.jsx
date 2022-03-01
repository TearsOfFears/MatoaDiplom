import React from "react";
import { Link } from "react-router-dom";
import { addProduct } from "./../../redux/Carts/cart.actions";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router";
import ProductDetails from "./ProductDetails/ProductDetails";
import ProductSection from "./ProductDetails/ProductSection";



const ProductCardRender = (product) => {
	return (
		<div>
			<ProductSection {...product}/>
			<ProductDetails {...product}/>

		</div>
	);
};

export default ProductCardRender;
