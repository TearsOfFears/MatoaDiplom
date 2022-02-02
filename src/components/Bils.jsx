import React from "react";

import pay1 from "../assets/img/home/payImages/pay1.png";
import pay2 from "../assets/img/home/payImages/pay2.png";
import pay3 from "../assets/img/home/payImages/pay3.png";
import pay4 from "../assets/img/home/payImages/pay4.png";
import pay5 from "../assets/img/home/payImages/pay5.png";
import pay6 from "../assets/img/home/payImages/pay6.png";
import pay7 from "../assets/img/home/payImages/pay7.png";
import pay8 from "../assets/img/home/payImages/pay8.png";
import pay9 from "../assets/img/home/payImages/pay9.png";
import pay10 from "../assets/img/home/payImages/pay10.png";

const imageArray = [pay1, pay2, pay3, pay4, pay5, pay6, pay7, pay8, pay9, pay10];
function Bils() {
	return (
		<section className="bils nopadding">
			<div className="container h-100 ">
				<div className="row h-100">
					<div className="wrapper-img-bils">
						{imageArray.map((img, index) => {
							return <img src={img} key={index} />;
						})}
					</div>
				</div>
			</div>
		</section>
	);
}

export default Bils;
