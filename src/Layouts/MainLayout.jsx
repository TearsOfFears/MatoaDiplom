import React from "react";
import { Footer, Header } from "../components";
import "./Layouts.scss";
const MainLayout = (props) => {
	return (
		<div className="MainLayout">
			<Header {...props} />
			<div className="main">{props.children}</div>
			<Footer />
		</div>
	);
};

export default MainLayout;
