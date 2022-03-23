import React from "react";
import "./style.scss";
const FormInputPayment = ({ handleChange, value, Label, ...otherProprs }) => {
	return (
		<div className="formBlock">
			{Label && <label>{Label}</label>}
			<input
				className="formInput"
				value={value}
				onChange={handleChange}
				{...otherProprs}
			/>
		</div>
	);
};

export default FormInputPayment;
