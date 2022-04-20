import React, { useState, useEffect } from "react";
import "./details.scss";
import classnames from "classnames";
import SplineTest from "../../SplineTest";
const ProductDetails = (product) => {
	const { productDesc } = product;
	const details = [
		"Деталі",
		"Гарантія",
		"На замовлення",
		"Як налаштовувати",
		"Догляд",
	];
	const detailsRender = [
		productDesc,
		"<h2>Warranty 2</h2> ",
		"<h2>Custom Engrave 3</h2> ",
		"<h2>How to Adjust 4</h2> ",
		"<h2>How to Care 5</h2> ",
	];
	const [active, setActive] = useState(0);
	const [stateStyle, setstateStyle] = useState({ fade: false });
	const handleActive = (index) => {
		setActive(index);
		setstateStyle({ fade: true });
	};
	const [state, setstate] = useState();
	useEffect(() => {
		setstate();
	}, [product]);

	return (
		<section className="details">
			<div className="container">
				<div className="row">
					<div className="wrapper-details">
						<div className="header-details">
							<ul className="header-details__list">
								{details.map((text, index) => {
									return (
										<li
											className={
												active === index ? "nav-link active" : "nav-link"
											}
											onClick={() => handleActive(index)}
										>
											{text}
										</li>
									);
								})}
							</ul>
						</div>
						<div
							onAnimationEnd={() => setstateStyle({ fade: false })}
							className={
								stateStyle.fade ? "imgAnimate header-info" : "header-info"
							}
							dangerouslySetInnerHTML={{ __html: detailsRender[active] }}
						/>
						<SplineTest/>
					</div>
				</div>
			</div>
		</section>
	);
};

export default ProductDetails;
