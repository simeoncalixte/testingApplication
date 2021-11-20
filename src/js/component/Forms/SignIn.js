import React from "react";
import ColumnForm from "./ColumnFormContainer.js";

export const SignIn = props => {
	const emailReference = React.useRef();
	const passwordReference = React.useRef();
	const signInHandler = event => {
		const { email, password } = getEmailAndPassword();
		authenticationService.signInWithPassword(email, password);
	};

	return (
		<ColumnForm onSubmit={signInHandler}>
			<h1>Sign In</h1>
			<label>
				<div>Email</div>
				<input ref={emailReference} type="text" name="userName" />
			</label>
			<label>
				<div>Password</div>
				<input ref={passwordReference} type="password" name="userName" />
			</label>
			<button type="submit">Sign In</button>
		</ColumnForm>
	);
};

export default SignIn;
