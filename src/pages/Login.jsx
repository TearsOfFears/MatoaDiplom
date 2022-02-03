import React from "react";
import { Link } from "react-router-dom";

import MainLayout from "../Layouts/MainLayout";

import { SignIn } from "../components";

const Login = (props) => {
	return (
		<div>
			<MainLayout>
			<SignIn/>
			</MainLayout>
		</div>
	);
};

export default Login;
