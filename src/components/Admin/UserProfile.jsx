import React from "react";
import { Buttons, IconLogin, IconCart } from "./../index";

const UserProfile = (configUserProfile) => {
	return (
		<div className="userProfile">
			<span className="photoborder">
				{configUserProfile.currentUser.photoURL === null ? (
					<IconLogin />
				) : (
					<img src={configUserProfile.currentUser.photoURL} alt="" />
				)}
			</span>
			<h1>{configUserProfile.currentUser.displayName}</h1>
		</div>
	);
};

export default UserProfile;
