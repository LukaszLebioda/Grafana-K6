//------------
// npm run k6 (k6 run testfile.js)
// npm run k6debug (k6 run --http-debug="full" testfile.js)
// https://test-api.k6.io/
//------------

// POST request: register and login

import http from "k6/http";
// import { check } from "k6";

export default function () {
	const urlRegister = "https://test-api.k6.io/user/register/";
	const urlLogin = "https://test-api.k6.io/auth/token/login/";

	const payload = JSON.stringify({
		username: "test_" + Date.now(),
		password: "secret_" + Date.now(),
	});

	const params = {
		headers: {
			"Content-Type": "application/json",
		},
	};

	http.post(urlRegister, payload, params);

	let response = http.post(urlLogin, payload, params);

	const accessToken = response.json().access;
	console.log("token: ", accessToken);

	// http.get("https://test-api.k6.io/my/crocodiles/", {
	// 	headers: {
	// 		Authorization: "Bearer " + accessToken,
	// 	},
	// });
}
