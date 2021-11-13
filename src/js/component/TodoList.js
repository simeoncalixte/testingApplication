import React from "react";
import PropTypes from "prop-types";

export const TodoList = props => {
	const inputReference = React.useRef();

	const deleteItem = (event, i) => {
		const newList = props.list.filter((todo, itemIndex) => {
			return itemIndex !== i;
		});

		props.updateList(newList);
	};

	const addInputValueToList = e => {
		const value = inputReference.current.value;
		const itemToAdd = {
			label: value,
			description: "",
			isCompleted: false,
			dueDate: Date()
		};

		props.updateList([...props.list, itemToAdd]);
		inputReference.current.value = "";
	};

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
			<input ref={inputReference} name="newTodoItemInsert" />
			<button name="add" onClick={addInputValueToList}>
				Add
			</button>
			<section>
				<ul>{props.list.map(mapList)}</ul>
			</section>
		</div>
	);
};

export default TodoList;

TodoList.propTypes = {
	list: PropTypes.array,
	updateList: PropTypes.func
};
