import React from "react";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { checkUserSession } from "../../redux/User/user.actions";
import { Buttons, IconLogin, IconCart } from "./../index";

const UserProfile = (configUserProfile) => {
	const dispatch = useDispatch()
	const letterToUpperCase = (str) => {
		const str2 = str.charAt(0).toUpperCase() + str.slice(1);
		return str2;
	};
	useEffect(()=>{
		dispatch(checkUserSession());
	},[])
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
