import React, { useState, useEffect } from "react";
import { ButtonForm, AuthWrapper } from "./index";
import FormInput from "./Forms/FormInput";
import { Navigate } from "react-router";
import { useDispatch, useSelector } from "react-redux";

import { signUpUser, resetAllAuthForm } from "../redux/User/user.actions";

const mapState = ({ user }) => ({
	signUpSuccess: user.signUpSuccess,
	signUpError: user.signUpError,
});

const initialState = {
	displayName: "",
	email: "",
	password: "",
	confirmPassword: "",
};

const SignUp = (props) => {
	const [state, setstate] = useState(initialState);
	const dispatch = useDispatch();
	const { signUpSuccess, signUpError } = useSelector(mapState);

	const [errors, setErrors] = useState([]);

	const reset = () => {
		setstate(initialState);
	};

	const handleChange = (e) => {
		const value = e.target.value;
		setstate({
			...state,
			[e.target.name]: value,
		});
	};

	const handleFormSubmit = (event) => {
		event.preventDefault();
		dispatch(
			signUpUser({
				displayName: displayName,
				email: email,
				password: password,
				confirmPassword: confirmPassword,
			})
		);
		// const { displayName, email, password, confirmPassword, errors } = state;
		// if (password !== confirmPassword) {
		// 	const err = ["Паролі не спіпадають"];
		// 	setstate({
		// 		errors: err,
		// 	});
		// 	return;
		// }
		// try {
		// 	const { user } = await auth.createUserWithEmailAndPassword(
		// 		email,
		// 		password
		// 	);
		// 	await handleUserProfile(user, { displayName });

		// 	reset();
		// } catch (err) {
		// 	console.log(err);
		// }
	};

	useEffect(() => {
		if (signUpSuccess) {
			reset();
			dispatch(resetAllAuthForm());
		}
	}, [signUpSuccess]);

	useEffect(() => {
		if (Array.isArray(signUpError) && signUpError.length > 0) {
			setErrors(signUpError);
		}
	}, [signUpError]);
	const { displayName, email, password, confirmPassword } = state;

	const configAuthWrapper = {
		headline: "Зареєструватись",
	};
	return (
		<AuthWrapper {...configAuthWrapper}>
			<div className="formWrapper">
				{errors.length > 0 && alert(errors)}

				<form onSubmit={handleFormSubmit}>
					<FormInput
						type="text"
						name="displayName"
						value={displayName}
						placeholder="full name"
						onChange={handleChange}
					/>
					<FormInput
						type="email"
						name="email"
						value={email}
						placeholder="Email"
						onChange={handleChange}
					/>
					<FormInput
						type="password"
						name="password"
						value={password}
						placeholder="Password"
						onChange={handleChange}
					/>
					<FormInput
						type="password"
						name="confirmPassword"
						value={confirmPassword}
						placeholder="confirmPassword"
						onChange={handleChange}
					/>
					<ButtonForm type="submit"> Зареєструватись</ButtonForm>
				</form>
			</div>
		</AuthWrapper>
	);
};

export default SignUp;
