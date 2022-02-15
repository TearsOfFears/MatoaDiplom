import React, { useState, useEffect } from "react";

import { AuthWrapper } from "../index";

import FormInput from "./FormInput";
import ButtonForm from "./ButtonForm";


import { Navigate } from "react-router-dom";
import { Login } from "../../pages";

import { useDispatch, useSelector } from "react-redux";
import {
	onResetPasswordStart,
	resetUserState,
} from "../../redux/User/user.actions";

const mapState = ({ user }) => ({
	resetPasswordSuccess: user.resetPasswordSuccess,
	userErrors: user.userErrors,
});

const EmailPassword = (props) => {
	const [email, setEmail] = useState("");
	const [errors, setErrors] = useState([]);
	const [redirect, setRedirect] = useState(false);

	const { resetPasswordSuccess, userErrors } = useSelector(mapState);
	const dispatch = useDispatch();

	useEffect(() => {
		if (resetPasswordSuccess) {
			dispatch(resetUserState());
			setRedirect(true);
		}
	}, [resetPasswordSuccess]);

	useEffect(() => {
		if (Array.isArray(userErrors) && userErrors.length > 0) {
			setErrors(userErrors);
		}
	}, [userErrors]);

	const handleSubmit = (e) => {
		e.preventDefault();
		dispatch(onResetPasswordStart({ email }));
	};

	const configAuthWrapper = {
		headline: "Відновити пароль",
	};
	if (redirect) {
		return <Navigate to="/login" />;
	}

	return (
		<AuthWrapper {...configAuthWrapper}>
			<div className="formWrap">
				{errors.length > 0 && (
					<ul>
						{errors.map((e, index) => {
							return <li key={index}>{e}</li>;
						})}
					</ul>
				)}
				<form onSubmit={handleSubmit}>
					<FormInput
						type="email"
						name="email"
						value={email}
						placeholder="Email"
						onChange={(e) => setEmail(e.target.value)}
					/>
					<ButtonForm type="submit">Надіслати</ButtonForm>
				</form>
			</div>
		</AuthWrapper>
	);
};

export default EmailPassword;
