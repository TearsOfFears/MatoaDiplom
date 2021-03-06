import React from "react";
import "./Form.scss";

const FormSelect = ({
	options,
	defaultValue,
	defaultName,
	handleChange,
	label,
	...otherProps
}) => {
	if (!Array.isArray(options) || options.length < 1) return null;

	return (
		<div className="formRow">
			{label && <label>{label}</label>}
			<div className="wrapper-input">
				{" "}
				<select
					className="formSelect"
					value={defaultValue}
					onChange={handleChange}
					{...otherProps}
				>
					{options.map((option, index) => {
						const { value, name } = option;

						return (
							<option key={index} value={value}>
								{name}
							</option>
						);
					})}
				</select>
			</div>
		</div>
	);
};

export default FormSelect;
