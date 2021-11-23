import React from "react";
import ColumnForm from "./ColumnFormContainer.js";
import authenticationService from "../../../services/Firebase";
import { Context } from "../../store/appContext.js";

export const SignUp = props => {
	const context = React.useContext(Context);
	const emailReference = React.useRef();
	const passwordReference = React.useRef();

	const getEmailAndPassword = () => {
		let email, password;
		if (emailReference.current && emailReference.current.value) {
			email = emailReference.current.value;
		}
		if (passwordReference.current && passwordReference.current.value) {
			password = passwordReference.current.value;
		}
		return { email, password };
	};

	const signUpHandler = event => {
		event.preventDefault();
		const { email, password } = getEmailAndPassword();
		const currentState = context.globalState;
		context.updateState({
			...currentState,
			authentication: { ...currentState.authentication, isAuthLoading: true }
		});
		const signUpResults = authenticationService.signUpWithPassword(email, password).then(userCredentials => {
			userCredentials.isAuthLoading = false;
			const newState = { ...currentState, authentication: userCredentials };
			context.updateState(newState);
		});
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
