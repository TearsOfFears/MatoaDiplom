import React from "react";

const ButtonForm = ({ children,style, ...otherProps }) => {
	return <button className={`${style} btn-read ` } {...otherProps}>
        {children}
    </button>;
};

export default ButtonForm;
