// THRESHOLDS AND CHECKS

import http from "k6/http";
import { check } from "k6";
import { sleep } from "k6";

export const options = {
	vus: 10,
	duration: "10s",
	thresholds: {
		http_req_duration: ["p(95)<100"],
		http_req_failed: ["rate<0.01"], // only 1% of reqs can fail
	},
};

export default function () {
	const response = http.get("https://test.k6.io");
	// console.log(`Status is: ${response.status}`); // or res.body

	// 1st parameter of check() is a value ("true")
	// in callback function we have access to this value "(value)"
	// check(true, {
	// 	"true is true": (value) => value === true,
	// 	"true is false": (whatever) => whatever === false,
	// });

	check(response, {
		"status code is 200": (res) => res.status === 200,
		"page is startpage": (res) =>
			res.body.includes("Collection of simple web-pages"), // optional: === true,
	});
	// make test sleep for 2 sec after each iteration
	sleep(2);
}
