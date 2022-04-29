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

const seriesArray = [
	{
		titleFirst: "Maple Series",
		Array1: [
			{ title: "Way Kambas Maple", price: "Rp 1.280.000", img: ebony1 },
			{ title: "Kaili", price: "Rp 950.000", img: ebony2 },
			{ title: "Sunda", price: "Rp 1.170.000", img: ebony3 },
		],
	},
];

const mapState = ({ contentHome }) => ({
	productsSeries: contentHome.contentSeries.data,
});
function Series1() {
	const dispatch = useDispatch();
	const { productsSeries } = useSelector(mapState);
	console.log(productsSeries);
	useEffect(() => {
		const series = ["maple", "ebony", "skeleton"];
		dispatch(fetchHomeSeries({ series }));
	}, []);

	return (
		<section className="series">
			<div className="container text-center position-relative">
				<div className="row ">
					<div className="wrapper-series">
						<div className="block">
							<h1 className="wrapper-series-title">Кедрова колекція</h1>
							<hr />
							{Array.isArray(productsSeries) && productsSeries.map((data, index) => {
								const { productName, price, productThumbnail,series } = data;
								if(series === "maple"){
									return (
										<div className="wrapper-series-product" key={index}>
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
							<h1 className="wrapper-series-title">Кленова колекція</h1>
							<hr />
							{Array.isArray(productsSeries) && productsSeries.map((data, index) => {
								const { productName, price, productThumbnail,series } = data;
								if(series === "ebony"){
								return (
									<div className="wrapper-series-product" key={index}>
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
								if(series === "skeleton"){
								return (
									<div className="wrapper-series-product" key={index}>
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
					</div>
				</div>
				<div className="col-12 position-relative mb-5">
					<Buttons style="btn-withoutBg seemore"> See more </Buttons>
				</div>
			</div>
		</section>
	);
}

export default Series1;
