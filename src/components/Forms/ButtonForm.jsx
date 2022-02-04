import React from "react";

const ButtonForm = ({ children, ...otherProps }) => {
	return <button className=" btn" {...otherProps}>
        {children}
    </button>;
};

export default ButtonForm;
