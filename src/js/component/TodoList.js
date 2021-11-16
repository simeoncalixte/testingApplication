import React from "react";
import PropTypes from "prop-types";
import { Context } from "../store/appContext";

export const TodoList = props => {
	const inputReference = React.useRef();
	const [inputValue, updateInputValue] = React.useState();
	const { globalState, addInputValueToList, deleteItem } = React.useContext(Context);
	const { listItems } = globalState;

	const mapList = (listItem, i) => {
		return (
			<li key={i}>
				<h2>{listItem.label}</h2>
				<p>{listItem.description}</p>
				<data>{listItem.dueDate}</data>
				<button name="delete" onClick={event => deleteItem(event, i)}>
					<div>x</div>
				</button>
			</li>
		);
	};

	return (
		<div>
			<input
				ref={inputReference}
				value={inputValue}
				onChange={e => updateInputValue(e.target.value)}
				name="newTodoItemInsert"
			/>
			<button name="add" onClick={e => addInputValueToList(e, inputReference.current.value)}>
				Add
			</button>
			<section>
				<ul>{listItems.map(mapList)}</ul>
			</section>
		</div>
	);
};

export default TodoList;
