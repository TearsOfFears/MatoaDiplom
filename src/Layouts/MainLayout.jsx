import React from "react";
import { Footer, Header } from "../components";

const MainLayout = (props) => {
	return (
		<div>
			<Header {...props} />
			<div className="main">
				<div className="container">{props.children}</div>
			</div>
			<Footer />
		</div>
	);
};

export default MainLayout;
