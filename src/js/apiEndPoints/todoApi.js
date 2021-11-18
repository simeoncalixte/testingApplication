const get = user => {
	let requestOptions = {
		method: "GET",
		redirect: "follow"
	};

	return fetch(`https://assets.breatheco.de/apis/fake/todos/user/${user}`, requestOptions)
		.then(response => response.json())
		.catch(error => console.log("error", error));
};

const post = user => {
	let myHeaders = new Headers();
	myHeaders.append("Content-Type", "application/json");

	let raw = JSON.stringify([]);

	let requestOptions = {
		method: "POST",
		headers: myHeaders,
		body: raw,
		redirect: "follow"
	};
	return fetch(`https://assets.breatheco.de/apis/fake/todos/user/${user}`, requestOptions)
		.then(response => response.json())
		.catch(error => console.log("error", error));
};

///
const put = (todoList, user) => {
	let myHeaders = new Headers();
	myHeaders.append("Content-Type", "application/json");

	todoList = todoList.length ? todoList : [{ label: "none", done: false }];
	let requestOptions = {
		method: "PUT",
		headers: myHeaders,
		body: JSON.stringify(todoList),
		redirect: "follow"
	};

	return fetch(`https://assets.breatheco.de/apis/fake/todos/user/${user}`, requestOptions)
		.then(response => response.json())
		.catch(error => console.log("error", error));
};

const deleteUser = user => {
	let requestOptions = {
		method: "DELETE",
		redirect: "follow"
	};
	return fetch(`https://assets.breatheco.de/apis/fake/todos/user/${user}`, requestOptions)
		.then(response => response.json())
		.catch(error => console.log("error", error));
};
export default { deleteUser, post, put, get };
