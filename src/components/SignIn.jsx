import React, { Component } from "react";
import { ButtonForm, Buttons, AuthWrapper } from "./index";

import { signInWithGoogle, auth } from "./../firebase/utils";

import FormInput from "./Forms/FormInput";
import { Link } from "react-router-dom";

const initialState = {
	email: "",
	password: "",
};

class SignIn extends Component {
	constructor(props) {
		super(props);
		this.state = {
			...initialState,
		};
		this.handleChange = this.handleChange.bind(this);
	}
	handleSubmit = async (e) => {
		e.preventDefault();
		const { email, password } = this.state;
		try {
			await auth.signInWithEmailAndPassword(email, password);
			this.setState({
				...initialState,
			});
		} catch (err) {
			console.log(err);
		}
	};

	handleChange(e) {
		const { name, value } = e.target;
		this.setState({
			[name]: value,
		});
	}

	render() {
		const { email, password } = this.state;

		const configAuthWrapper = {
			headline: "Зайти",
		};
		return (
			<AuthWrapper {...configAuthWrapper}>
				<div className="formWrapper">
					<form onSubmit={this.handleSubmit}>
						<FormInput
							type="email"
							name="email"
							value={email}
							placeholder="Email"
							onChange={this.handleChange}
						/>
						<FormInput
							type="password"
							name="password"
							value={password}
							placeholder="Password"
							onChange={this.handleChange}
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
	}
}

export default SignIn;
