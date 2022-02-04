import React from "react";
import { Footer, Header, Bils } from "../components";

const ItemLayout = (props) => {
	return (
		<div>
			<Header {...props}/>
			<div className="main">{props.children}</div>
			<Bils />
			<Footer />
		</div>
	);
};

export default ItemLayout;
