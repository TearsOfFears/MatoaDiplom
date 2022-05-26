
import React from "react";

const Buttons = (props) => {
	return (
		<button className={props.style} onClick={props.onClick} value={props.value}>
			{props.icon} {props.text} {props.children}
		</button>
	);
};

export default Buttons;
