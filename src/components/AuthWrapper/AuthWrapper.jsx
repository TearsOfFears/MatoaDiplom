import React from "react";
import "./authwrapper.scss";
const AuthWrapper = ({ headline, children,recovery }) => {
	return (
		<div className={`authWrapper ${recovery}`}>
			<div className="wrap">
				{headline && <h1>{headline}</h1>}
				<div className="children">	{children && children}</div>
			</div>
		</div>
	);
};

export default AuthWrapper;

