import React, { useState, useEffect } from "react";
import "./details.scss";
import classnames from "classnames";
const ProductDetails = (product) => {
	const { productDesc } = product;
	const details = [
		"Detail",
		"Warranty",
		"Custom Engrave",
		"How to Adjust",
		"How to Care",
		"Gallery",
	];
	const detailsRender = [
		"Detail 1 ",
		"Warranty 2 ",
		"Custom Engrave 3 ",
		"How to Adjust 4 ",
		"How to Care 5 ",
		"Gallery 6",
	];
	const [active, setActive] = useState(0);
	const [stateStyle, setstateStyle] = useState({ fade: false });
	const handleActive = (index) => {
		setActive(index);
		setstateStyle({ fade: true });
	};
	console.log(active);

	const [state, setstate] = useState();
	useEffect(() => {
		setstate();
	}, [product]);

	return (
		<section class="details">
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
							className="header-info"
							dangerouslySetInnerHTML={{ __html: productDesc }}
						/>
						<div className="header-info">
							<div
								onAnimationEnd={() => setstateStyle({ fade: false })}
								className={stateStyle.fade ? "imgAnimate" : ""}
							>
								{detailsRender[active]}
							</div>

							<div className="block-img">
								<img src="../../img/kambas-mini/image 40.png" alt="" />
							</div>
						</div>
					</div>
				</div>
			</div>
		</section>
	);
};

export default ProductDetails;
