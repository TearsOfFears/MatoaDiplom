import React, { useState, useEffect } from "react";
import { ButtonForm, AuthWrapper } from "../index";
import FormInput from "../Forms/FormInput";
import { Navigate } from "react-router";
import { useDispatch, useSelector } from "react-redux";

import { registUserStart } from "../../redux/User/user.actions";

const mapState = ({ user }) => ({
	currentUser: user.currentUser,
	userErrors: user.userErrors,
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
	const { currentUser, userErrors } = useSelector(mapState);

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
			registUserStart({
				displayName: displayName,
				email: email,
				password: password,
				confirmPassword: confirmPassword,
			})
		);
	};

	useEffect(() => {
		if (currentUser) {
			reset();
		}
	}, [currentUser]);

	useEffect(() => {
		if (Array.isArray(userErrors) && userErrors.length > 0) {
			setErrors(userErrors);
		}
	}, [userErrors]);
	const { displayName, email, password, confirmPassword } = state;

	const configAuthWrapper = {
		headline: "Зареєструватись",
		recovery:"recovery"
	};
	return (
		<AuthWrapper {...configAuthWrapper}>
			<div className="formWrapper">
				{errors.length > 0 && alert(errors)}

				<form onSubmit={handleFormSubmit} className="formStyle">
					<FormInput
						type="text"
						name="displayName"
						value={displayName}
						placeholder="Ім`я"
						onChange={handleChange}
					/>
					<FormInput
						type="email"
						name="email"
						value={email}
						placeholder="Пошта"
						onChange={handleChange}
					/>
					<FormInput
						type="password"
						name="password"
						value={password}
						placeholder="Пароль"
						onChange={handleChange}
					/>
					<FormInput
						type="password"
						name="confirmPassword"
						value={confirmPassword}
						placeholder="Повторіть пароль"
						onChange={handleChange}
					/>
					<ButtonForm type="submit" style="mb-5 mt-5"> Зареєструватись</ButtonForm>
				</form>
			</div>
		</AuthWrapper>
	);
};

export default SignUp;
