import React, { useState, useEffect } from "react";
import getState from "./flux.js";
import todoApi from "../apiEndPoints/todoApi.js";

// Don't change, here is where we initialize our context, by default it's just going to be null.

export const Context = React.createContext(null);

export const withGlobalState = ComponentToBeWrapperd => {
	const ComponentToBeReturned = () => {
		const [globalState, updateState] = React.useState({
			authentication: {
				userName: "simeoncalixte",
				token: "",
				emailAddress: "",
				userId: ""
			},
			listItems: []
		});
		const [isInitialLoad, setInitialLoadState] = React.useState(true);

		React.useEffect(() => {
			if (isInitialLoad) {
				setInitialLoadState(false);
				todoApi.get(globalState.authentication.userName).then(results => {
					if (results.msg) return;
					const listItems = results;
					// update state with new list
					updateState({ ...globalState, listItems });
				});
			}
		}, []);

		const addInputValueToList = (event, value) => {
			const itemToAdd = {
				label: value,
				done: false
			};
			//create new List
			const listItems = [...globalState.listItems, itemToAdd];
			///send list to api
			todoApi.put(listItems, globalState.authentication.userName);
			// update state with new list
			updateState({ ...globalState, listItems });
		};

		const deleteItem = (event, i) => {
			debugger;
			const listItems = globalState.listItems.filter((todo, itemIndex) => {
				return itemIndex !== i;
			});
			///send list to api
			todoApi.put(listItems, globalState.authentication.userName);
			// update state with new list
			updateState({ ...globalState, listItems });
		};

		const markAsCompleted = (event, i) => {
			///edit item of index
			const listItems = globalState.listItems.map((todoItem, itemIndex, array) => {
				if (i === itemIndex) {
					todoItem.done = !todoItem.done;
					return todoItem;
				} else {
					return todoItem;
				}
			});
			//send edited list to api
			todoApi.put(listItems, globalState.authentication.userName);
			// update state with new list
			updateState({ ...globalState, listItems });
		};

		const contextValues = { globalState, updateState, addInputValueToList, deleteItem, todoApi, markAsCompleted };

		return (
			<Context.Provider value={contextValues}>
				<ComponentToBeWrapperd />
			</Context.Provider>
		);
	};

	return ComponentToBeReturned;
};

// This function injects the global store to any view/component where you want to use it, we will inject the context to layout.js, you can see it here:
// https://github.com/4GeeksAcademy/react-hello-webapp/blob/master/src/js/layout.js#L35
const injectContext = PassedComponent => {
	const StoreWrapper = props => {
		//this will be passed as the contenxt value

		const [state, setState] = useState(
			getState({
				getStore: () => state.store,
				getActions: () => state.actions,
				setStore: updatedStore =>
					setState({
						store: Object.assign(state.store, updatedStore),
						actions: { ...state.actions }
					})
			})
		);

		useEffect(() => {
			/**
			 * EDIT THIS!
			 * This function is the equivalent to "window.onLoad", it only runs once on the entire application lifetime
			 * you should do your ajax requests or fetch api requests here. Do not use setState() to save data in the
			 * store, instead use actions, like this:
			 *
			 * state.actions.loadSomeData(); <---- calling this function from the flux.js actions
			 *
			 **/
		}, []);

		// The initial value for the context is not null anymore, but the current state of this component,
		// the context will now have a getStore, getActions and setStore functions available, because they were declared
		// on the state of this component
		return (
			<Context.Provider value={state}>
				<PassedComponent {...props} />
			</Context.Provider>
		);
	};

	return StoreWrapper;
};

export default injectContext;
