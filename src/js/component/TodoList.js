import React from "react";
import PropTypes from "prop-types";
import { Context } from "../store/appContext";
import { useParams } from "react-router-dom";

export const TodoList = props => {
	const inputReference = React.useRef();
	const { userName } = useParams();
	const [inputValue, updateInputValue] = React.useState();
	const { globalState, addInputValueToList, deleteItem, markAsCompleted } = React.useContext(Context);
	const { listItems } = globalState;

	const mapList = (listItem, i) => {
		return (
			<li key={i}>
				<h2>{listItem.label}</h2>
				<button name="delete" onClick={event => deleteItem(event, i)}>
					<div>x</div>
				</button>
				<input
					type={"checkbox"}
					name="markAsComplete"
					onChange={event => markAsCompleted(event, i)}
					defaultChecked={listItem.done}
				/>
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
