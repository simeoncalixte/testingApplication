import React, { useState, useEffect, useContext } from "react";
import PropTypes from "prop-types";
import { Link, useParams, Switch, Route, useRouteMatch } from "react-router-dom";
import { Context } from "../store/appContext";
import TodoList from "../component/TodoList.js";
import Todo from "../component/Todo.js";
import Nick from "../component/Nick.js";
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
	let { path, url } = useRouteMatch();
	const [todoItems, setTodoItems] = React.useState(defaultList);
	const [userName, setUser] = React.useState([]);

	const params = useParams();

	return (
		<>
			<h1>Todo</h1>
			<Nick />
			<Switch>
				<Route exact path={path}>
					<TodoList list={todoItems} updateList={setTodoItems} />
				</Route>
				<Route path={`/todo/nick`} />
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
export default TodoApplication;
