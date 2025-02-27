// correlating requests (using one request to get a certain value, and use that value in another request)

// accessing and verifying json response body

import http from "k6/http";
import { check } from "k6";

export default function () {
	// get all crocodiles to get 1st crocodile id
	let response = http.get("https://test-api.k6.io/public/crocodiles/");
	const allCrocodiles = response.json();
	// get a particular crocodile
	const firstCrocodileName = allCrocodiles[0].name;
	const firstCrocodileId = allCrocodiles[0].id;
	// use that crocodile in another request
	response = http.get(
		`https://test-api.k6.io/public/crocodiles/${firstCrocodileId}`
	);

	// console.log(response.json());
	// console.log("name: ", response.json().name);
	// console.log("id: ", response.json().id);
	check(response, {
		"status code is 200": (res) => res.status === 200,
		"1 - crocodile name": (res) => res.json().name === firstCrocodileName,
		"2 - crocodile id": (res) => res.json().id === firstCrocodileId,
	});

	console.log(response.headers);
	console.log(response.headers.Allow);
	console.log(response.headers["Content-Type"]);
}
