import React, { useState, useEffect, useContext } from "react";
import PropTypes from "prop-types";
import { Link, useParams, Switch, Route, useRouteMatch } from "react-router-dom";
import { Context } from "../store/appContext";
import TodoList from "../component/TodoList.js";
import Todo from "../component/Todo.js";
import todoApi from "../apiEndPoints/todoApi";
// interface Todo {
// 	label: string;
// 	description: string;
// 	dueDate: Date;
// 	isCompleted: boolean;
// }

// interface ITodoApplication {
// 	useName: String;
// 	todoItems: Todo[];
// }

const defaultList = [
	{
		label: "Test Label",
		done: false
	}
];

export const TodoApplication = props => {
	const { globalState, updateState } = React.useContext(Context);
	const userReference = React.useRef();
	let { path, url } = useRouteMatch();

	const userSubmitted = response => {
		if (response.result && response.result === "ok") {
			if (userReference.current.value) {
				updateState({
					...globalState,
					authentication: {
						...globalState.authentication,
						userName: userReference.current.value
					}
				});
			}
		}
	};

	////submit user to the backend
	const formSubmit = event => {
		event.preventDefault();
		todoApi.post(userReference.current.value).then(userSubmitted); //.catch();
		////other logic
	};

	return (
		<>
			<h1>Todo</h1>
			<form onSubmit={formSubmit}>
				<label>User Name:</label>
				<input ref={userReference} name="userName" type="text" placeholder="Enter User" />
				<button type="submit">Add User To Context</button>
			</form>
			<Switch>
				<Route exact path={path}>
					<TodoList />
				</Route>
				<Route path={`${path}/:todoId`}>
					<Todo />
				</Route>
			</Switch>
			<button onClick={e => todoApi.deleteUser(globalState.authentication.userName)}>Delete User</button>
		</>
	);
};

TodoApplication.propTypes = {
	match: PropTypes.object
};
export default TodoApplication;
