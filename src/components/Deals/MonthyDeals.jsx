import React, { useEffect } from "react";
import "./style.scss";

import { Buttons } from "../index";
import { useDispatch, useSelector } from "react-redux";
import {
	fetchCurrentProductStart,
	fetchProductsStart,
} from "../../redux/Products/products.actions";
import { useNavigate } from "react-router";

const mapState = ({ productsData }) => ({
	products: productsData.products.data,
});

function MonthyDeals() {
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const { products } = useSelector(mapState);

	useEffect(() => {
		const discountQ = "true";
		const pageSize = 4;
		dispatch(fetchProductsStart({ discountQ,pageSize }));
	}, []);
	const getData = (productName) => {
		navigate(`/product/${productName}`);
	};
	return (
		<section className="monthlyDeals">
			<div className="container">
				<h1>Monthly Deals</h1>
				<hr />
				<div className="row">
					<div className="wrapper-ourProducts-Deals">
						{Array.isArray(products) &&
							products.map((data, index) => {
								const {
									price,
									discountPersentage,
									productName,
									productThumbnail,
									documentId,
								} = data;
								let priceOLd = 0;

								priceOLd = (price * 100) / (100 - discountPersentage);

								return (
									<div key={index}>
										<div className="block-text">
											<div className="wrapper-img">
												<img src={productThumbnail[0]} alt="" />
											</div>

											<div className="wrapper-text">
												<h1>{productName}</h1>
												<p>-{discountPersentage}% знижка</p>
												<strike>{priceOLd} грн.</strike>
												<h1>{price} грн.</h1>
											</div>
										</div>
										<Buttons
											style="btn-checkout animate__animated animate__fadeIn"
											onClick={(e) => getData(productName)}
										>
											Переглянути
										</Buttons>
									</div>
								);
							})}
					</div>
				</div>
			</div>
		</section>
	);
}

export default MonthyDeals;
