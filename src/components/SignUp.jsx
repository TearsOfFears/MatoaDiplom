import React, { Component, useState } from "react";
import { ButtonForm } from "./index";
import FormInput from "./Forms/FormInput";
import { Navigate } from "react-router";
import { auth, handleUserProfile } from "./../firebase/utils";

const SignUp = (props) => {
	const initialState = {
		displayName: "",
		email: "",
		password: "",
		confirmPassword: "",
		errors: [],
	};

	const [state, setstate] = useState(initialState);

	const handleChange = (e) => {
		const value = e.target.value;
		setstate({
			...state,
			[e.target.name]: value,
		});
	};

	const handleFormSubmit = async (event) => {
		event.preventDefault();
		const { displayName, email, password, confirmPassword, errors } = state;
		if (password !== confirmPassword) {
			const err = ["Паролі не спіпадають"];
			setstate({
				errors: err,
			});
			return;
		}
		try {
			const { user } = await auth.createUserWithEmailAndPassword(
				email,
				password
			);
			await handleUserProfile(user, { displayName });
			setstate({
				...initialState,
			});
		} catch (err) {
			console.log(err);
		}
	};
	const { displayName, email, password, confirmPassword, errors } = state;

	return (
		<div className="SignUp">
			<div className="wrapper">
				<h2> Зареєструватись</h2>
			</div>
			{errors.length > 0 && alert(errors)}
			<form onSubmit={handleFormSubmit}>
				<FormInput
					type="text"
					name="displayName"
					value={displayName}
					placeholder="full name"
					onChange={(e) => handleChange(e)}
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
	);
};

export default SignUp;
