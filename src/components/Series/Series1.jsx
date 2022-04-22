import React from "react";
import "./series.scss";
import { Buttons } from "./../index";

import ebony1 from "./../../assets/img/home/ebony-1.png";
import ebony2 from "./../../assets/img/home/ebony-2.png";
import ebony3 from "./../../assets/img/home/ebony-3.png";

const seriesArray = [
	{
		titleFirst: "Maple Series",
		Array1: [
			{ title: "Way Kambas Maple", price: "Rp 1.280.000", img: ebony1 },
			{ title: "Kaili", price: "Rp 950.000", img: ebony2 },
			{ title: "Sunda", price: "Rp 1.170.000", img: ebony3 },
		],
	},
	{
		titleFirst: "Ebony Series",
		Array1: [
			{ title: "Tomia Ebony", price: "Rp 1.280.000", img: ebony1 },
			{ title: "Mori", price: "Rp 960.000", img: ebony2 },
			{ title: "Alor", price: "Rp 1.170.000", img: ebony3 },
		],
	},
	{
		titleFirst: "Featured",
		Array1: [
			{ title: "Sikka (Ebony & Maple)", price: "Rp 1.198.000", img: ebony1 },
			{ title: "Lore Walnut", price: "Rp 1.280.000", img: ebony2 },
			{
				title: "Way Kambas Limited Edition",
				price: "Rp 1.170.000",
				img: ebony3,
			},
		],
	},
];

function Series1() {
	return (
		<section className="series">
			<div className="container text-center position-relative">
				<div className="row ">
					<div className="wrapper-series">
						{seriesArray.map((data, index) => {
							return (
								<div className="block" key={index}>
									<h1 className="wrapper-series-title">{data.titleFirst}</h1>
									<hr />
									{data.Array1.map((arr, index) => {
										return (
											<div className="wrapper-series-product" key={index}>
												<div className="wrapper-series-product__block-img">
													<img src={arr.img} alt="" />
												</div>
												<div className="wrapper-series-product__block-title-price">
													<h1>{arr.title}</h1>
													<p>{arr.price}</p>
												</div>
											</div>
										);
									})}
								</div>
							);
						})}
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
