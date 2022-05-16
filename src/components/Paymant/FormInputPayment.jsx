import React from "react";
import "./style.scss";
const FormInputPayment = ({
	handleChange,
	value,
	Label,
	required,
	maxlengthVal,
	...otherProprs
}) => {
	console.log(maxlengthVal);
	return (
		<div className="formBlock">
			{Label && <label>{Label}</label>}
			<input
				required
				className="formInput"
				value={value}
				maxlength = {maxlengthVal}
				onChange={handleChange}
				{...otherProprs}
			/>
		</div>
	);
};

export default FormInputPayment;
