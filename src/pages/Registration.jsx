import React from "react";
import { Link } from "react-router-dom";

import { Header } from "../components";
import MainLayout from "../Layouts/MainLayout";

function Registration() {
	return (
		<div className="Registration">
			<MainLayout>
				<div className="container">
					<h1>regsitr</h1>
					<Link to="/"> BACK</Link>
				</div>
			</MainLayout>
		</div>
	);
}

export default Registration;
