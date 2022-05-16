import React from "react";
import "./style.scss";

function AboutUs() {
	return (
		<section className="aboutUs">
			<div className="d-flex flex-column align-items-center">
				<h3>
					<span>MATOA Україна</span>
				</h3>
				<hr />
				<p>Є ще одним твором шедевру Бандунга. </p>
			</div>
			<div className="d-flex flex-column align-items-center text-center">
				<p>
					Творіння молоді, співпраця мистецтва, творчості та технологій створили
					екологічно чистий продукт.<br/>Маючи 90% місцевої сировини, MATOA
					перетворює деревину на революційний продукт, який піклується про
					планету.
				</p>
			</div>
		</section>
	);
}

export default AboutUs;
