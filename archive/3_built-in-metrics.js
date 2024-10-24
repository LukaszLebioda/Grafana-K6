// THRESHOLDS & BUILT-IN METRICS (METHODS)
// SIMULATION ON REQUEST FAILURE + "CHECK" BUILT-IN METRIC

import http from "k6/http";
import { check } from "k6";
import { sleep } from "k6";
import exec from "k6/execution"; // execution data

export const options = {
	vus: 5,
	duration: "5s",
	thresholds: {
		// trend: metric type that calculates things (max/min/average values, percentiles etc.)
		http_req_duration: ["p(90)<2000", "p(95)<2500"], // percentiles
		http_req_duration: ["max<2000"], // max values
		// rate is a metric type that measures how frequently a non-zero value occurs
		http_req_failed: ["rate<=0.01"], // only 1% of reqs can fail
		http_req_failed: ["rate<5"], // only 4 reqs total can fail
		// count: aggregation metric type that measures absolute value
		http_reqs: ["count>10"], // must be more than 10 requests
		// rate: aggregation metric type that measures average value per time
		http_reqs: ["rate>1.5"], // must be more than 1.5 request per second
		// gauge: aggregation metric type that measures min / max of a value
		vus: ["value>3"], // must be more than 3 vus at every moment of the test
		// thanks to importation of "exec" and simulation of one request failure
		checks: ["rate>=0.91"],
	},
};

export default function () {
	// const response = http.get("https://test.k6.io"); // correct address
	// console.log(exec.scenario.iterationInTest); // logs out iterations
	const response = http.get(
		"https://test.k6.io" + (exec.scenario.iterationInTest === 1 ? "foo" : "")
	); // simulates that one request goes wrong

	check(response, {
		"status code is 200": (res) => res.status === 200,
		"page is startpage": (res) =>
			res.body.includes("Collection of simple web-pages"), // optional: === true,
	});
	sleep(2);
}
