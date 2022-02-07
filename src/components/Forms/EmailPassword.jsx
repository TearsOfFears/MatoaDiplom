import React, { Component } from "react";

import { AuthWrapper } from "../index";

import FormInput from "./FormInput";
import ButtonForm from "./ButtonForm";

import { auth } from "../../firebase/utils";

import { Navigate } from "react-router-dom";
import { Login } from "../../pages";

const initialState = {
	email: "",
	errors: [],
};
class EmailPassword extends Component {
	constructor(props) {
		super(props);
		this.state = {
			...initialState,
			redirect: false,
		};
		this.handleChange = this.handleChange.bind(this);
	}

	handleChange(e) {
		const { name, value } = e.target;
		this.setState({
			[name]: value,
		});
	}

	handleSubmit = async (e) => {
		e.preventDefault();

		try {
			const { email } = this.state;

			const config = {
				url: "http://localhost:3000/login",
			};

			await auth
				.sendPasswordResetEmail(email, config)

				.then(() => {
					this.setState({ redirect: true });
				})
				.cath(() => {
					const err = ["Пошта не знайдена.Попробуйте ще раз"];
					this.setState({
						errors: err,
					});
				});
		} catch (errFirebase) {
			// console.log(err);
		}
	};
	render() {
		const { email, redirect, errors } = this.state;

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
					<form onSubmit={this.handleSubmit}>
						<FormInput
							type="email"
							name="email"
							value={email}
							placeholder="Email"
							onChange={this.handleChange}
						/>
						<ButtonForm type="submit">Надіслати</ButtonForm>
					</form>
				</div>
			</AuthWrapper>
		);
	}
}

export default EmailPassword;
