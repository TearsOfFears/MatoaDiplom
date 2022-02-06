import React, { Component } from "react";
import { ButtonForm } from "./index";
import FormInput from "./Forms/FormInput";
import { Navigate } from "react-router";
import { auth, handleUserProfile } from "./../firebase/utils";

const initialState = {
	displayName: "",
	email: "",
	password: "",
	confirmPassword: "",
	errors: [],
};

class SignUp extends Component {
	constructor(props) {
		super(props);
		this.state = {
			...initialState,
		};
		this.handleChange = this.handleChange.bind(this);
	}

	handleChange(e) {
		const { name, value } = e.target;
		this.setState({
			[name]: value,
		});
	}

	handleFormSubmit = async (event) => {
		event.preventDefault();
		const { displayName, email, password, confirmPassword, errors } =
			this.state;

		if (password !== confirmPassword) {
			const err = ["Паролі не спіпадають"];
			this.setState({
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
			this.setState({
				...initialState,
			});
		} catch (err) {
			console.log(err);
		}
	};
	render() {
		const { displayName, email, password, confirmPassword, errors } =
			this.state;
		return (
			<div className="SignUp">
				<div className="wrapper">
					<h2> Зареєструватись</h2>
				</div>
				{errors.length > 0 && alert(errors)}
				<form onSubmit={this.handleFormSubmit}>
					<FormInput
						type="text"
						name="displayName"
						value={displayName}
						placeholder="full name"
						onChange={this.handleChange}
					/>
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
					<FormInput
						type="password"
						name="confirmPassword"
						value={confirmPassword}
						placeholder="confirmPassword"
						onChange={this.handleChange}
					/>
					<ButtonForm type="submit"> Зареєструватись</ButtonForm>
				</form>
			</div>
		);
	}
}

export default SignUp;
