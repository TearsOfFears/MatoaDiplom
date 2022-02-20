import React, { useEffect } from "react";

import { useParams } from "react-router";
import { useDispatch, useSelector } from "react-redux";

import {
	setCurrentProduct,
	fetchCurrentProductStart,
} from "../redux/Products/products.actions";
import { ProductCardRender } from "./index";


const mapState = (state) => ({
	product: state.productsData.product,
});

const ProductCard = ({renderState}) => {
	const dispatch = useDispatch();
	const { productID } = useParams();

	const {product} = useSelector(mapState);

	const {productThumbnail, productName, productPrice} = product || {};

  
	useEffect(() => {
      dispatch(fetchCurrentProductStart(productID))
      
		return () => {
			dispatch(setCurrentProduct({}))
		}
	}, []);

  
	return (
   <div>
    <ProductCardRender {...product}/>
   </div>
      
  );
};

export default ProductCard;
