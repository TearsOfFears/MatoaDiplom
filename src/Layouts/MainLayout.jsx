import React from "react";
import { Footer, Header } from "../components";

const MainLayout = (props) => {
	return (
		<div>
			<Header />
			<div className="main">{props.children}</div>
      <Footer/>
		</div>
	);
};

export default MainLayout;
