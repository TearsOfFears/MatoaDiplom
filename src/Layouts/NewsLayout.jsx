import React from "react";
import { Footer, Header } from "../components";
import "./Layouts.scss";
function NewsLayout(props) {
	return (
		<div className="NewsLayout">
			<Header {...props} />
			<div className="container">
				<section className="newsMain">
					<div className="col-9 main-block">{props.children}</div>
					<div className="col-3 suggest-block">ff</div>
				</section>
			</div>
			<Footer />
		</div>
	);
}

export default NewsLayout;
