import React from "react";
import { Buttons, IconLogin, IconCart } from "./../index";

const UserProfile = (configUserProfile) => {
	const letterToUpperCase = (str) => {
		const str2 = str.charAt(0).toUpperCase() + str.slice(1);
		return str2;
	};
	return (
		<div className="userProfile">
			<span className="photoborder">
				{configUserProfile.currentUser.photoURL === null ? (
					<IconLogin />
				) : (
					<img src={configUserProfile.currentUser.photoURL} alt="" />
				)}
			</span>
			<h1>{letterToUpperCase(configUserProfile.currentUser.displayName)}</h1>
		</div>
	);
};

export default UserProfile;
