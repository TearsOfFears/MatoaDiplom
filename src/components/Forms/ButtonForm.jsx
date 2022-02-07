import React from "react";

const ButtonForm = ({ children, ...otherProps }) => {
	return <button className="btn-read mb-5" {...otherProps}>
        {children}
    </button>;
};

export default ButtonForm;
