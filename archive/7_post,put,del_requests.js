// POST request: register and login with token
// POST request: create new resource
// GET request: get newly created resource by its id
// PUT request: update existing resource
// PATCH request: update existing resource
// DEL request: delete existing resource

import http from "k6/http";
import { check } from "k6";

export default function () {
	const urlRegister = "https://test-api.k6.io/user/register/";
	const urlLogin = "https://test-api.k6.io/auth/token/login/";
	const urlCreateResource = "https://test-api.k6.io/my/crocodiles/";

	// register
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

	// login
	let response = http.post(urlLogin, payload, params);
	// acquire access token
	const accessToken = response.json().access;
	console.log("token: ", accessToken);

	// use token to create resource
	const payloadCreateCrocodile = JSON.stringify({
		name: "Crocco",
		sex: "M",
		date_of_birth: "1901-09-18",
	});
	const paramsCrocodile = {
		headers: {
			Authorization: "Bearer " + accessToken,
			"Content-Type": "application/json",
		},
	};
	response = http.post(
		urlCreateResource,
		payloadCreateCrocodile,
		paramsCrocodile
	);
	const myNewCrocodileId = response.json().id;

	// use token to get newly created resource by its id
	response = http.get(
		`https://test-api.k6.io/my/crocodiles/${myNewCrocodileId}/`,
		{
			headers: {
				Authorization: "Bearer " + accessToken,
			},
		}
	);
	const myCrocodileName = response.json().name;
	check(response, {
		"status is 200": (r) => r.status === 200,
		"crocodile has correct id": (r) => r.json().id === myNewCrocodileId,
		"crocodile name is Crocco": (r) => r.json().name === "Crocco",
	});
	// // verify headers
	// console.log(response.headers);
	// console.log(response.headers.Allow);
	// console.log(response.headers["Content-Type"]);

	// update existing resource with PUT request
	response = http.put(
		`https://test-api.k6.io/my/crocodiles/${myNewCrocodileId}/`,
		JSON.stringify({
			name: "Crocco Updated-PUT",
			sex: "M",
			date_of_birth: "1901-09-18",
		}),
		paramsCrocodile
	);
	check(response, {
		"crocodile name is Crocco Updated-PUT": (r) =>
			r.json().name === "Crocco Updated-PUT",
	});

	// update existing resource with PATCH request
	response = http.patch(
		`https://test-api.k6.io/my/crocodiles/${myNewCrocodileId}/`,
		JSON.stringify({
			name: "Crocco Updated-PATCH",
		}),
		paramsCrocodile
	);
	check(response, {
		"crocodile name is Crocco Updated-PATCH": (r) =>
			r.json().name === "Crocco Updated-PATCH",
	});

	// delete existing resource with DEL request
	response = http.del(
		`https://test-api.k6.io/my/crocodiles/${myNewCrocodileId}/`,
		null,
		{
			headers: {
				Authorization: "Bearer " + accessToken,
			},
		}
	);
	check(response, {
		"status is 204 - Crocco has been deleted": (r) => r.status === 204,
	});
}
