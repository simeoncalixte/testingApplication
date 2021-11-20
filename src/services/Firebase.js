// Import the functions you need from the SDKs you need

import { initializeApp } from "firebase/app";
import { getAuth, createUserWithEmailAndPassword,signInWithEmailAndPassword } from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use

// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration

// For Firebase JS SDK v7.20.0 and later, measurementId is optional

const firebaseConfig = {
	apiKey: "AIzaSyD1hjjD57pSzlARrQ8jzKoJ7SwWdsUXyFw",

	authDomain: "reacttest-739f9.firebaseapp.com",

	projectId: "reacttest-739f9",

	storageBucket: "reacttest-739f9.appspot.com",

	messagingSenderId: "871601907188",

	appId: "1:871601907188:web:512d8f30e7ad316e2e05a1",

	measurementId: "G-5B3KBSV0QG"
};

// Initialize Firebase

const app = initializeApp(firebaseConfig);

const authInstance = getAuth();

const signUpWithPassword = (email, password) =>
	createUserWithEmailAndPassword(authInstance, email, password)
		.then(userCredential => {
			// Signed in
			debugger;
			const user = userCredential.user;

			// ...
		})
		.catch(error => {
			const errorCode = error.code;
			const errorMessage = error.message;
			// ..
		});

const signInWithPassword = (email,password) => signInWithEmailAndPassword(auth, email, password)
.then((userCredential) => {
  // Signed in 
  const user = userCredential.user;
  // ...
})
.catch((error) => {
  const errorCode = error.code;
  const errorMessage = error.message;
});

export default { app, signUpWithPassword,signInWithPassword, authInstance };
