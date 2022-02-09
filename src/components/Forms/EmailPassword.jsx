import React, { useState, useEffect } from "react";

import { AuthWrapper } from "../index";

import FormInput from "./FormInput";
import ButtonForm from "./ButtonForm";

import { auth } from "../../firebase/utils";

import { Navigate } from "react-router-dom";
import { Login } from "../../pages";

const EmailPassword = (props) => {
	const [email, setEmail] = useState("");
	const [errors, setErrors] = useState([]);
	const [redirect, setRedirect] = useState(false);

	const handleSubmit = async (e) => {
		e.preventDefault();

		try {
			const config = {
				url: "http://localhost:3000/login",
			};

			await auth
				.sendPasswordResetEmail(email, config)

				.then(() => {
					setRedirect(true);
				})
				.cath(() => {
					const err = ["Пошта не знайдена.Попробуйте ще раз"];
					setErrors(err);
				});
		} catch (errFirebase) {
			// console.log(err);
		}
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
