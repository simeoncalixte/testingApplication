let requestOptions = {
	method: "GET",
	redirect: "follow"
};

const get = () =>
	fetch("https://assets.breatheco.de/apis/fake/todos/user/simeoncalixte", requestOptions)
		.then(response => response.text())
		.then(result => console.log(result))
		.catch(error => console.log("error", error));

let myHeaders = new Headers();
myHeaders.append("Content-Type", "application/json");

let raw = JSON.stringify([]);

let requestOptions = {
	method: "POST",
	headers: myHeaders,
	body: raw,
	redirect: "follow"
};

const post = user =>
	fetch(`https://assets.breatheco.de/apis/fake/todos/user/${user}`, requestOptions)
		.then(response => response.text())
		.then(result => console.log(result))
		.catch(error => console.log("error", error));

let myHeaders = new Headers();
myHeaders.append("Content-Type", "application/json");

const put = values => {
	let requestOptions = {
		method: "PUT",
		headers: myHeaders,
		body: JSON.stringify(values),
		redirect: "follow"
	};

	return fetch("https://assets.breatheco.de/apis/fake/todos/user/simeoncalixte", requestOptions)
		.then(response => response.text())
		.then(result => console.log(result))
		.catch(error => console.log("error", error));
};

let requestOptions = {
	method: "DELETE",
	redirect: "follow"
};

const deleteUser = () =>
	fetch("https://assets.breatheco.de/apis/fake/todos/user/simeoncalixte", requestOptions)
		.then(response => response.text())
		.then(result => console.log(result))
		.catch(error => console.log("error", error));

export default { deleteUser, post, put, get };
