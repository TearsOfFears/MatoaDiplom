import React from "react";
import FormSelect from "./../Forms/FormSelect";

const SelectedItems = (configFilters) => {
	const { name } = configFilters;
	console.log(configFilters);
	return (
		<div>
			<h1>{name}</h1>
			<FormSelect {...configFilters} />
		</div>
	);
};

export default SelectedItems;
