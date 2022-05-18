import React from "react";
import "./Form.scss";
const FormInput = ({ handleChange, Label, ...otherProprs }) => {
	return (
		<div className="formRow">
			{Label && <label>{Label}</label>}
			<div className="wrapper-input">
				{" "}
				<input className="formInput" onChange={handleChange} {...otherProprs} />
			</div>
		</div>
	);
};

export default FormInput;
