import React from "react";

const UserProfile = (configUserProfile) => {
	return <div className="userProfile"><h1>{configUserProfile.currentUser.displayName}</h1></div>;
};

export default UserProfile;
