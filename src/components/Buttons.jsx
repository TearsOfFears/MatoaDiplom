
import React from "react";

const Buttons = (props) => {
	return (
		<button className={props.style}>
			{props.icon} {props.text} {props.children}
		</button>
	);
};

export default Buttons;
