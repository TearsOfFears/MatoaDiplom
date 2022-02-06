import React, { Component } from "react";
import { ButtonForm, Buttons } from "./index";

import { signInWithGoogle, auth } from "./../firebase/utils";

import FormInput from "./Forms/FormInput";

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
		
		return (
			<div className="signIn">
				<div className="container">
					<div className="wrapper">
						<h1> Log In</h1>
					</div>
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
								ЗАЙТИ
							</Buttons>

							<div className="socialSignIn">
								<div className="row">
									<ButtonForm onClick={signInWithGoogle}>
										Sign In with Google
									</ButtonForm>
								</div>
							</div>
						</form>
					</div>
				</div>
			</div>
		);
	}
}

export default SignIn;
