import React from "react";

import "./../components/Admin/Admin.scss";
import MenageProducts from "../components/Admin/MenageProducts";


const Admin = () => {

	return (
		<div className="Admin">
			<div className="callToActions">
				<MenageProducts />
			</div>
		</div>
	);
};

export default Admin;
