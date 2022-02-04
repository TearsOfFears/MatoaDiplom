import React, { Component } from "react";
import { ButtonForm } from ".";

import { signInWithGoogle } from "./../firebase/utils";

class SignIn extends Component {
	handleSubmit = async e =>{
		e.preventDefault();
	}
	render() {
		return (
			<div className="signIn">
				<div className="container">
					<div className="wrapper">
						<h1> Log In</h1>
					</div>
					<div className="formWrapper">
					<form onSubmit={this.handleSubmit}>
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
