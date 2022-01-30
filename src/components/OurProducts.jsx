import React from "react";

import productsEyes from "../assets/img/home/productsEyes.png";
import productsWatch from "../assets/img/home/productsWatch.png";

import { Buttons } from "./index";

function OurProducts() {
	return (
		<section className="ourProducts">
			<div className="container nopadding">
				<div className="row">
					<div className="wrapper-ourProducts">
						<div>
							<h1>
								Luxurious <span> Eyewear</span>
							</h1>
							<p>See the beauty of exotic world with the luxurious glasses</p>
							<Buttons style="btn-discover"> Discover Now </Buttons>
							<img src={productsEyes} alt="" />
						</div>
						<div>
							<h1>
								Comfortable <span> Watches</span>
							</h1>
							<p>
								Feels the balancing function and beauty in our wooden watches
							</p>
							<Buttons style="btn-discover"> Discover Now </Buttons>
							<img src={productsWatch} alt="" className="size-big" />
						</div>
					</div>
				</div>
			</div>
		</section>
	);
}

export default OurProducts;
