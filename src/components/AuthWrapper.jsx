import React from "react";

const AuthWrapper = ({ headline, children }) => {
	return (
		<div className="authWrapper">
			<div className="wrap">
				{headline && <h1>{headline}</h1>}
				<div className="children">	{children && children}</div>
			</div>
		</div>
	);
};

export default AuthWrapper;

