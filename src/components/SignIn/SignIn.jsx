import { useDispatch, useSelector } from "react-redux";
import React, { useState, useEffect } from "react";
import { ButtonForm, Buttons, AuthWrapper } from "../index";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGoogle } from "@fortawesome/free-brands-svg-icons";
import FormInput from "../Forms/FormInput";
import { Link } from "react-router-dom";

import {
	emailSigInStart,
	googleSignIn
} from "../../redux/User/user.actions";

const mapState = ({ user }) => ({
	currentUser: user.currentUser,
	userErrors: user.userErrors,
});

const SignIn = (props) => {
	const { currentUser,userErrors } = useSelector(mapState);
	const dispatch = useDispatch();
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [errors, setErrors] = useState([]);
	useEffect(() => {
		if (currentUser) {
			resetForm();
		}
	}, [currentUser]);

	const resetForm = () => {
		setEmail("");
		setPassword("");
	};
	useEffect(() => {
		if (Array.isArray(userErrors) && userErrors.length > 0) {
			setErrors(userErrors);
		}
	}, [userErrors]);
	const handleSubmit = (e) => {
		e.preventDefault();
		dispatch(emailSigInStart({ email, password }));
	};

	const configAuthWrapper = {
		headline: "Увійти",
	};
	const handleSignInWithGoogle = () => {
		dispatch(googleSignIn());
	};

	return (
		<AuthWrapper {...configAuthWrapper}>
			<div className="formWrapper">
			{errors.length > 0 && (
					<ul style={{listStyleType:"none", margin:0, padding:0,}}>
						{errors.map((e, index) => {
							return <li key={index}>{e}</li>;
						})}
					</ul>
				)}
				<form onSubmit={handleSubmit} className="formStyle">
					<FormInput
						type="email"
						name="email"
						value={email}
						placeholder="Пошта"
						onChange={(e) => setEmail(e.target.value)}
					/>
					<FormInput
						type="password"
						name="password"
						value={password}
						placeholder="Пароль"
						onChange={(e) => setPassword(e.target.value)}
					/>
					<Buttons type="submit" style="btn-read">
						Увійти
					</Buttons>
						<ButtonForm
							onClick={handleSignInWithGoogle}
							className="btn-read mb-1 mt-3"
						>
							Увійти з  <FontAwesomeIcon icon={faGoogle} />
						</ButtonForm>
						<Link to="/recovery" className="btn-read mb-1">
							Відновити пароль
						</Link>
						<Link to="/registration" className="btn-read mb-5">
							Зареєструватись
						</Link>
				</form>
			</div>
		</AuthWrapper>
	);
};

export default SignIn;
