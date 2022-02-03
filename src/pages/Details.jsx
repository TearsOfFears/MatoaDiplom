import React from "react";
import { Link } from "react-router-dom";
import { Header } from "../components";

import ItemLayout from "../Layouts/ItemLayout";

function Details() {
	return (
		<ItemLayout>
			<Link to="/">Back</Link>
		</ItemLayout>
	);
}

export default Details;
