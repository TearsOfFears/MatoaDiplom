import React from "react";

const CountrySelect = (props) => {
	return (
		<div className="countrySelect">
			<label>{props.name}</label>
			{props.children}
		</div>
	);
};

export default CountrySelect;
