import React from "react";
import { Link } from "react-router-dom";
import SignUp from "../component/Forms/SignUp.js";
import SignIn from "../component/Forms/SignIn.js";
import styled from "styled-components";
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
	const AuthenticationComponents = [SignIn, SignUp];
	const shouldHide = isOpen ? true : false;
	const [componentToDisplayIndex, toggleComponent] = React.useState(0);
	const ComponentToDisplay = AuthenticationComponents[componentToDisplayIndex];
	const buttonValue = componentToDisplayIndex ? "click here to register" : "click here to sign up";

	return (
		<section>
			<div onClick={() => toggleOpen(!isOpen)}>Login/Register</div>
			<DropDownBody hidden={shouldHide}>
				<ComponentToDisplay />
				<FormAlternative
					onClick={() => {
						toggleComponent(Number(!!!componentToDisplayIndex));
					}}>
					{buttonValue}
				</FormAlternative>
			</DropDownBody>
		</section>
	);
};
