import React from "react";

import Vector1 from "./../../assets/img/home/Vector1.png";

function LinesBG() {
	return (
		<div className="wrapper-lines-bg">
			<div className="lines">
				<div className="block-top-lines">
					<img src={Vector1} alt="" />
				</div>
				<div className="block-middle-lines">
					<img src={Vector1} alt="" />
				</div>
				<div className="block-bottom-lines">
					<img src={Vector1} alt="" />
				</div>
			</div>
			<div className="block-news-bg"></div>
		</div>
	);
}

export default LinesBG;
