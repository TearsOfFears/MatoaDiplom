import React from "react";
import { useDispatch,useSelector } from "react-redux";
import {
	addProduct,
	reduceCartItem,
} from "./../../../redux/Carts/cart.actions";
import { createStructuredSelector } from "reselect";
import { selectCartTotal,selectCartItemsCount } from "./../../../redux/Carts/cart.selectors";

import {useNavigate} from 'react-router-dom'



const ProductSection = (product) => {

	const dispatch = useDispatch();
    const navigate = useNavigate();

	const { productName, price, productThumbnail,quantity } = product;


	const handleAddToCart = (product) => {
		if (!product) return;
		dispatch(addProduct(product));
		navigate("/cart");
	};

	return (
		<section className="addToCart">
			<div className="bg-second-accent"></div>
			<div className="container">
				<div className="row">
					<div className="container-min">
						<div className="wrapper-addToCart">
							<div className="wrapper-addToCart-images-wrapper">
								<div className="wrapper-addToCart-images-wrapper__hover">
									<img src="../../img/kambas-mini/kambas-Minin-1.png" alt="" />
									<img src="../../img/kambas-mini/kambas-Minin-2.png" alt="" />
									<img src="../../img/kambas-mini/kambas-Minin-3.png" alt="" />
									<img src="../../img/kambas-mini/kambas-Minin-4.png" alt="" />
								</div>
								<div className="wrapper-addToCart-images-wrapper__active">
									<img src={productThumbnail} alt="" />
								</div>
							</div>

							<div className="wrapper-addToCart__info">
								<h1>{productName}</h1>
								<strike>{price} грн.</strike>
								<h2>{price} грн. </h2>
								<div className="block-add">
							
									<a  className="btn-read" onClick={() => handleAddToCart(product)}>
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
}

export default ProductSection;
