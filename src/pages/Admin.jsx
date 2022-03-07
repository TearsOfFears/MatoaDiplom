import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import "./../components/Admin/Admin.scss";


import MenageProducts from "../components/Admin/MenageProducts";
import MenageHomePage from "../components/Admin/MenageHomePage";

//const mapState = ({ productsData }) => ({ products: productsData.products });

const Admin = () => {
	//const {} = configModalProductPage

	return (
		<div className="Admin">
			<div className="callToActions">
				<MenageProducts />
				{/* <MenageHomePage/> */}
			</div>
		</div>
	);
};

export default Admin;
