import React from "react";

import deals1 from "../assets/img/home/deals1.png";
import deals2 from "../assets/img/home/deals2.png";
import deals3 from "../assets/img/home/deals3.png";
import deals4 from "../assets/img/home/deals4.png";

import { Buttons } from "./index";

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

function MonthyDeals() {
	return (
		<section className="monthlyDeals">
			<div className="container nopadding">
				<h1>Monthly Deals</h1>
				<hr />
				<div className="row">
					<div className="wrapper-ourProducts-Deals">
						{dealsArray.map((data, index) => {
							const priceNew =
								data.strikePrice - (data.strikePrice * data.off) / 100;
							return (
								<div key={index}>
									<img src={data.img} alt="" />
									<div className="block-text ">
										<h1>{data.title}</h1>
										<p>{data.off}% off</p>
										<strike>{data.strikePrice} грн.</strike>
										<h1>{priceNew} грн.</h1>
										<Buttons style="btn-checkout animate__animated animate__fadeIn">
											Check this out!
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
