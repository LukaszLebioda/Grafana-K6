// CHECKS (ASSERTIONS)

import http from "k6/http";
import { check } from "k6";
import { sleep } from "k6";

export const options = {
	vus: 10,
	duration: "10s",
};

export default function () {
	const response = http.get("https://test.k6.io");

	// 1st parameter of check is a value we want to have acces to (e.g. response)
	// 2nd parameter is an object with property: "name of the check" (e.g. "status code is 200") and with value of that property being a callback function
	// in this callback function we have access to the value (1st parameter) (we can call it whatever we want, e.g. "(res)")
	// then we perform some action on this value ("res.status") and compare it to the requested outcome ("===200")
	// so we make a condition that should return TRUE
	check(response, {
		"status code is 200": (res) => res.status === 200,
		"page is startpage": (res) =>
			res.body.includes("Collection of simple web-pages"), // optional: === true,
	});
	sleep(2);
}
