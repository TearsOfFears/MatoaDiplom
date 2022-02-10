import { useDispatch, useSelector } from "react-redux";
import React, { useState, useEffect } from "react";
import { ButtonForm, Buttons, AuthWrapper } from "./index";

import FormInput from "./Forms/FormInput";
import { Link } from "react-router-dom";

import {
	signInUser,
	signInWithGoogle,
	resetAllAuthForm,
} from "./../redux/User/user.actions";

const mapState = ({ user }) => ({
	signInSuccess: user.signInSuccess,
});

const SignIn = (props) => {
	const { signInSuccess } = useSelector(mapState);

	const dispatch = useDispatch();
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");

	useEffect(() => {
		if (signInSuccess) {
			resetForm();
			dispatch(resetAllAuthForm());
		}
	}, [signInSuccess]);

	const resetForm = () => {
		setEmail("");
		setPassword("");
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		dispatch(signInUser({ email, password }));
	};

	const configAuthWrapper = {
		headline: "Зайти",
	};
	const handleSignInWithGoogle = () => {
		dispatch(signInWithGoogle());
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
							onClick={handleSignInWithGoogle}
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
