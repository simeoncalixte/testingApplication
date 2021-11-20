import React from "react";
import ColumnForm from "./ColumnFormContainer.js";

export const SignUp = props => {
	const emailReference = React.useRef();
	const passwordReference = React.useRef();

	const signUpHandler = event => {
		event.preventDefault();
		const { email, password } = getEmailAndPassword();
		authenticationService.signUpWithPassword(email, password);
	};

	return (
		<ColumnForm onSubmit={signUpHandler}>
			<h1>Sign Up</h1>
			<label>
				<div>Email</div>
				<input ref={emailReference} type="text" name="userName" />
			</label>
			<label>
				<div>Password</div>
				<input ref={passwordReference} type="password" name="userName" />
			</label>
			<button type="submit">Sign Up</button>
		</ColumnForm>
	);
};

export default SignUp;
