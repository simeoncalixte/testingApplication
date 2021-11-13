import React from "react";
import { useParams } from "react-router-dom";

export const Todo = props => {
	debugger;
	let { topicId } = useParams();
	return <div className="-view">One Todo Item</div>;
};

export default Todo;
