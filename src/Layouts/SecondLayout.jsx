import React from "react";
import { Footer, Header, Bils } from "../components";
import "./Layouts.scss";
const SecondLayout = (props) => {
	return (
		<div className="ItemLayout">
			<Header {...props} />
			<div className="container">{props.children}</div>
			<Footer />
		</div>
	);
};

export default SecondLayout;
