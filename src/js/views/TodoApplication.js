import React, { useState, useEffect, useContext } from "react";
import PropTypes from "prop-types";
import { Link, useParams, Switch, Route, useRouteMatch } from "react-router-dom";
import { Context, withGlobalState } from "../store/appContext";
import TodoList from "../component/TodoList.js";
import Todo from "../component/Todo.js";
import Nick from "../component/Nick.js";
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
		description: "Test Description",
		dueDate: Date(),
		isCompleted: false
	}
];

export const TodoApplication = props => {
	const { store, actions } = useContext(Context);
	const userReference = React.useRef();
	let { path, url } = useRouteMatch();
	const [todoItems, setTodoItems] = React.useState(defaultList);
	const [userName, setUser] = React.useState([]);

	const params = useParams();
	const formSubmit = event => {
		event.preventDefault();
		todoApi.post(userReference.current.value);
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
					<TodoList updateList={setTodoItems} />
				</Route>
				<Route path={`/todo/:topicId`}>
					<Todo />
				</Route>
			</Switch>
		</>
	);
};

TodoApplication.propTypes = {
	match: PropTypes.object
};
export default withGlobalState(TodoApplication);
