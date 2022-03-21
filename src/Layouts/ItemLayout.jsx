import React from "react";
import { Footer, Header, Bils } from "../components";
import "./Layouts.scss";
const ItemLayout = (props) => {
	return (
		<div className="ItemLayout">
			<Header {...props} />
			<div className="main">{props.children}</div>
			<Bils />
			<Footer />
		</div>
	);
};

export default ItemLayout;
