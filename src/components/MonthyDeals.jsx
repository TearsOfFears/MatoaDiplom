import React, { useEffect } from "react";

import deals1 from "../assets/img/home/deals1.png";
import deals2 from "../assets/img/home/deals2.png";
import deals3 from "../assets/img/home/deals3.png";
import deals4 from "../assets/img/home/deals4.png";

import { Buttons } from "./index";
import { useDispatch, useSelector } from "react-redux";
import { fetchCurrentProductStart, fetchProductsStart } from "../redux/Products/products.actions";
import { useNavigate } from "react-router";
const dealsArray = [
	{
		title: "Singo Maple",
		img: deals1,
		off: 10,
		strikePrice: 2600,
	},
	{
		title: "Fire Gold",
		img: deals2,
		off: 25,
		strikePrice: 2700,
	},
	{
		title: "Mini Time",
		img: deals3,
		off: 15,
		strikePrice: 2400,
	},
	{
		title: "Tatu Ebony",
		img: deals4,
		off: 20,
		strikePrice: 2700,
	},
];
const mapState = ({ productsData }) => ({ products: productsData.products.data });

function MonthyDeals() {
	const dispatch = useDispatch();
	const navigate = useNavigate()
	const { products } = useSelector(mapState);
	useEffect(() => {
		const discount = "true";
		dispatch(fetchProductsStart({ discount }));
	}, []);
	const getData = (productID) => {
		//dispatch(fetchCurrentProductStart(productID));
		navigate(`/product/${productID}`)
	};
	return (
		<section className="monthlyDeals">
			<div className="container nopadding">
				<h1>Monthly Deals</h1>
				<hr />
				<div className="row">
					<div className="wrapper-ourProducts-Deals">
						{Array.isArray(products) && products.map((data, index) => {
							const {
								price,
								discountPersentage,
								productName,
								productThumbnail,
								documentId
							} = data;
							const priceNew = price - (price * discountPersentage) / 100;
							return (
								<div key={index}>
									<img src={productThumbnail[0]} alt="" />
									<div className="block-text ">
										<h1>{productName}</h1>
										<p>{discountPersentage}% off</p>
										<strike>{price} грн.</strike>
										<h1>{priceNew} грн.</h1>
										<Buttons style="btn-checkout animate__animated animate__fadeIn" onClick={e=>getData(documentId)}>
											Переглянути
										</Buttons>
									</div>
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
