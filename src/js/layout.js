import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import ScrollToTop from "./component/scrollToTop";

import { Home } from "./views/home";
import { Demo } from "./views/demo";
import TodoApp from "./views/TodoApplication";
import injectContext from "./store/appContext";

import { Navbar } from "./component/navbar";
import { Footer } from "./component/footer";

//create your first component

const colors = ["white", "black", "yellow", "green", "purple"];
const Layout = () => {
	const [currentColor, setColor] = React.useState(colors[2]);
	const [counter, setCounter] = React.useState(0);
	//the basename is used when your project is published in a subdirectory and not in the root of the domain
	// you can set the basename on the .env file located at the root of this project, E.g: BASENAME=/react-hello-webapp/
	const basename = process.env.BASENAME || "";

	// React.useEffect(/**Effectfunction */, /**deps Optional*/);

	const incrementColor = e => {
		setColor(prevColor => {
			const currentIndex = colors.indexOf(prevColor);
			if (currentIndex === colors.length - 1) {
				return colors[0];
			} else {
				return colors[currentIndex + 1];
			}
		});
	};

	const updateCount = () => {
		/// any logic we want to run
		setCounter(prevTime => {
			return prevTime + 1;
		});
	};

	//// set a interval  to change the color
	const setIntervals = () => {
		setInterval(updateCount, 1000);
	};

	/// whenever the colorChange use my effectCallback

	/// on Page load/ on Mount/ on first render,   run this Effect Callback///
	React.useEffect(setIntervals, []);

	return (
		<div style={{ backgroundColor: currentColor, height: "100vh" }}>
			<button onClick={incrementColor}>Main Application</button>
			<span>{counter}</span>
			<BrowserRouter basename={basename}>
				<ScrollToTop>
					<Navbar />
					<Switch>
						<Route exact path="/" />
						<Route exact path="/demo">
							<Demo />
						</Route>
						<Route exact path="/todo">
							<TodoApp />
						</Route>
						<Route>
							<h1>Not found!</h1>
						</Route>
					</Switch>
					<Footer />
				</ScrollToTop>
			</BrowserRouter>
		</div>
	);
};

export default injectContext(Layout);
