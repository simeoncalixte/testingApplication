import React from "react";
import { Link } from "react-router-dom";
import SignUp from "../component/Forms/SignUp.js";
import SignIn from "../component/Forms/SignIn.js";
import styled from "styled-components";
import { Context } from "../store/appContext.js";
import { getIdTokenResult } from "@firebase/auth";
import authenticationService from "../../services/Firebase.js";

export const Navbar = () => {
	return (
		<nav className="navbar navbar-light bg-light mb-3">
			<Link to="/">
				<span className="navbar-brand mb-0 h1">React Boilerplate</span>
			</Link>
			<div className="ml-auto">
				<Link to="/demo">
					<button className="btn btn-primary">Check the Context in action</button>
				</Link>
			</div>
			<div className="ml-auto">
				<Link to="/todo">
					<button className="btn btn-primary">TodoList</button>
				</Link>
			</div>
			<div className="ml-auto">
				<Link to="/todo/1">
					<button className="btn btn-primary">TodoItem</button>
				</Link>
			</div>
			<DropDown />
		</nav>
	);
};

const DropDownBody = styled.section`
	position: absolute;
	right: 0;
	margin: 20px;
	border: 3px outset #3824c512;
	padding: 10px;
	border-radius: 3px;
	background: #e3e6ff;
`;

const FormAlternative = styled.span``;

const DropDown = () => {
	const [isOpen, toggleOpen] = React.useState(false);
	const [isAuthenitcated, setAuth] = React.useState(false);
	const AuthenticationComponents = [SignIn, SignUp];
	const shouldHide = isOpen ? true : false;
	const [componentToDisplayIndex, toggleComponent] = React.useState(0);
	const ComponentToDisplay = AuthenticationComponents[componentToDisplayIndex];
	const buttonValue = componentToDisplayIndex ? "click here to sign in" : "click here to sign up";
	const { globalState, updateState } = React.useContext(Context);
	const { authentication } = globalState;
	const isAuthLoading = authentication && authentication.isAuthLoading ? authentication.isAuthLoading : false;
	const authCheck = async () => {
		if (authentication) {
			if (authentication.hasOwnProperty("auth")) {
				if (authentication.auth.hasOwnProperty("currentUser")) {
					const userIsAuthenticated = await getIdTokenResult(authentication.auth.currentUser);
					setAuth(true);
				}
			}
		} else {
			setAuth(false);
		}
	};

	React.useEffect(() => {
		authCheck();
	});

	const logOut = () => {
		const newState = { ...globalState, authentication: null };
		updateState(newState);
		authenticationService.signOutApp();
	};

	return (
		<>
			<div onClick={() => toggleOpen(!isOpen)}>Login/Register</div>
			{isAuthenitcated && (
				<>
					<div onClick={logOut}>Logout</div>
				</>
			)}
			<section>
				{isAuthLoading && <Loading />}
				{!isAuthenitcated && (
					<>
						<DropDownBody hidden={shouldHide}>
							<ComponentToDisplay />
							<FormAlternative
								onClick={() => {
									toggleComponent(Number(!!!componentToDisplayIndex));
								}}>
								{buttonValue}
							</FormAlternative>
						</DropDownBody>
					</>
				)}
			</section>
		</>
	);
};

const Loading = () => {
	return (
		<div className="spinner-border" role="status">
			<span className="sr-only">Loading...</span>
		</div>
	);
};
