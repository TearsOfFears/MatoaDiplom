import React, { useState, useEffect } from "react";
import { ButtonForm, Buttons, AuthWrapper } from "./index";

import { signInWithGoogle, auth } from "./../firebase/utils";

import FormInput from "./Forms/FormInput";
import { Link } from "react-router-dom";

const SignIn = (props) => {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");

	const resetForm = () => {
		setEmail("");
		setPassword("");
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		try {
			await auth.signInWithEmailAndPassword(email, password);
			resetForm();
		} catch (err) {
			console.log(err);
		}
	};

	const configAuthWrapper = {
		headline: "Зайти",
	};

	return (
		<AuthWrapper {...configAuthWrapper}>
			<div className="formWrapper">
				<form onSubmit={handleSubmit}>
					<FormInput
						type="email"
						name="email"
						value={email}
						placeholder="Email"
						onChange={(e) => setEmail(e.target.value)}
					/>
					{email}
					<FormInput
						type="password"
						name="password"
						value={password}
						placeholder="Password"
						onChange={(e) => setPassword(e.target.value)}
					/>
					<Buttons type="submit" style="btn-read">
						Зайти
					</Buttons>

					<div className="socialSignIn">
						<ButtonForm
							onClick={signInWithGoogle}
							className="btn-read mb-5 mt-3"
						>
							Sign In with Google
						</ButtonForm>
					</div>
					<div className="links">
						<Link to="/recovery" className="btn-read mb-5 mt-3">
							Відновити ваш пароль
						</Link>
					</div>
				</form>
			</div>
		</AuthWrapper>
	);
};

export default SignIn;
