// ENVIRONMENT VARIABLES
// SLEEP TO RANDOMIZE VU BEHAVIOUR
// RANDOM INT BETWEEN + RANDOM STRING

import http from "k6/http";
import { sleep } from "k6";
import { randomIntBetween } from "https://jslib.k6.io/k6-utils/1.2.0/index.js";
import { randomString } from "https://jslib.k6.io/k6-utils/1.2.0/index.js";
import { randomItem } from "https://jslib.k6.io/k6-utils/1.2.0/index.js";

export const options = {
	vus: 5,
	duration: "10s",
};

export default function () {
	// ENVIRONMENT VARIABLES
	// console.log(__ENV.BASE_URL);
	const urlRegister = `${__ENV.BASE_URL}/user/register/`;
	// and then in terminal:
	// k6 run -e BASE_URL=https://test-api.k6.io testFile.js

	// RANDOM STRING
	// the best way to generate random creds with multiple users
	const credentials = JSON.stringify({
		username: "test_" + randomString(5), // or + Date.now(),
		password: "secret_" + randomString(5), // or + Date.now(),
	});
	console.log(credentials);
	const params = {
		headers: {
			"Content-Type": "application/json",
		},
	};
	http.post(urlRegister, credentials, params);

	// SLEEP (WITH RANDOM INT BETWEEN)
	// sleep: think time, a pause user normally would do,
	// while using the application
	// in the example below 5 users will enter url at once,
	// then there will be a pause for 3 seconds
	// and then 5 users will again enter the url at once,
	console.log("- VU stage -");
	sleep(3);
	// this is not a realistic behaviour, we need to randomize it
	// using library from import above (our writing our own script)
	console.log("- upgraded VU stage -");
	sleep(randomIntBetween(1, 5));

	// RANDOM ARRAY ELEMENT
	let response = http.get(`${__ENV.BASE_URL}/public/crocodiles/`);
	const crocodiles = response.json();
	console.log(crocodiles);
	const crocodileIds = crocodiles.map((crocodile) => crocodile.id);
	console.log(crocodileIds);
	// ----------------
	const randomCrocodileId = randomItem(crocodileIds);
	console.log(randomCrocodileId);
	response = http.get(
		`${__ENV.BASE_URL}/public/crocodiles/${randomCrocodileId}`
	);
}
