import React from "react";
import "./series.scss";
import { Buttons } from "./../index";

import ebony1 from "./../../assets/img/home/ebony-1.png";
import ebony2 from "./../../assets/img/home/ebony-2.png";
import ebony3 from "./../../assets/img/home/ebony-3.png";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { fetchHomeSeries } from "../../redux/Home/home.actions";
import { useSelector } from "react-redux";
import { faFacebook } from "@fortawesome/free-brands-svg-icons";
import { Link,useNavigate } from "react-router-dom";


const mapState = ({ contentHome }) => ({
	productsSeries: contentHome.contentSeries.data,
});
function Series1() {
	const dispatch = useDispatch();
	const navigate = useNavigate()
	const { productsSeries } = useSelector(mapState);
	useEffect(() => {
		const series = ["maple", "ebony", "skeleton"];
		dispatch(fetchHomeSeries({ series }));
	}, []);
	const getData = (productName) => {
		navigate(`/product/${productName}`);
	};
	return (
		<section className="series">
			<div className="container text-center position-relative">
				<div className="row ">
					<div className="wrapper-series">
						<div className="block">
							<h1 className="wrapper-series-title">Кленова колекція</h1>
							<hr />
							{Array.isArray(productsSeries) && productsSeries.map((data, index) => {
								const { productName, price, productThumbnail,series } = data;
								if(series === "maple"){
									return (
										<div className="wrapper-series-product" key={index} onClick={(e) => navigate(`/product/${productName}`)}>
											<div className="wrapper-series-product__block-img">
												<img src={productThumbnail[0]} alt="" />
											</div>
											<div className="wrapper-series-product__block-title-price">
												<h1>{productName}</h1>
												<p>{price} ₴</p>
											</div>
										</div>
									);
								}
								
							})}
						</div>
						<div className="block">
							<h1 className="wrapper-series-title">Чорна колекція</h1>
							<hr />
							{Array.isArray(productsSeries) && productsSeries.map((data, index) => {
								const { productName, price, productThumbnail,series } = data;
								if(series === "ebony"){
								return (
									<div className="wrapper-series-product" key={index} onClick={(e) => navigate(`/product/${productName}`)}>
										<div className="wrapper-series-product__block-img">
											<img src={productThumbnail[0]} alt="" />
										</div>
										<div className="wrapper-series-product__block-title-price">
											<h1>{productName}</h1>
											<p>{price} ₴</p>
										</div>
									</div>
								);
								}
							})}
						</div>
						<div className="block">
							<h1 className="wrapper-series-title">Скелетон колекція</h1>
							<hr />
							{Array.isArray(productsSeries) && productsSeries.map((data, index) => {
								const { productName, price, productThumbnail,series } = data;
								if(series === "skeleton"){
								return (
									<div className="wrapper-series-product" key={index}>
										<div className="wrapper-series-product__block-img">
											<img src={productThumbnail[0]} alt="" />
										</div>
										<div className="wrapper-series-product__block-title-price" onClick={(e) => navigate(`/product/${productName}`)}>
											<h1>{productName}</h1>
											<p>{price} ₴</p>
										</div>
									</div>
								);
								}
							})}
						</div>
					</div>
				</div>
				<div className="col-12 position-relative mb-5">
					<Link to="/products?sort=&order=&available=&discount=&series=" className="btn-withoutBg seemore"> Побачити більше </Link>
				</div>
			</div>
		</section>
	);
}

export default Series1;
