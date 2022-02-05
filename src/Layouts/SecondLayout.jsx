import React from "react";
import { Footer, Header, Bils } from "../components";

const SecondLayout = (props) => {
	return (
		<div className="main">
			<Header {...props} />
			<div className="container">{props.children}</div>
			<Footer />
		</div>
	);
};

export default SecondLayout;
