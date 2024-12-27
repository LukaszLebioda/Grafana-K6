//------------
// npm run k6
//------------

import http from "k6/http";
import { check } from "k6";
import { sleep } from "k6";

export const options = {
	vus: 10,
	duration: "3s",
	thresholds: {
		// in-build metric_name: ["metric_type: trend, counter, rate, gauge]<>value"]
		http_req_duration: ["p(95)<500"], // trend: 95% reqs should be < 300 ms
		http_req_duration: ["max<3000"], // trend: 100% reqs should be < 3000 ms
		http_reqs: ["count>10"], // counter: at least 20 reqs have to be sent
		iterations: ["count>10"], // counter: at least 20 iterations have to be made
		http_req_failed: ["rate<0.01"], // rate: only 1% requests can fail
		http_reqs: ["rate>3"], // rate: at least 4 reqs/sec should be sent
		vus: ["value>1"], // gauge: there should be at least 1 vu at every moment
		vus_max: ["value < 20"], // gauge: there should be max 20 vu at every moment
		// unique treshold for checks
		checks: ["rate>=0.98"], // rate: 98% cheks have to pass
	},
	// 	stages: [
	// 		{ duration: "10s", target: 10 },
	// 		{ duration: "30s", target: 10 },
	// 		{ duration: "10s", target: 0 },
	// 	],
};

export default function () {
	const response = http.get("https://test.k6.io/");
	// console.log(response.status, response.body);

	check(response, {
		"status code is 200": (res) => res.status === 200,
		"body contains header": (res) => res.body.includes("load testing"),
	});

	sleep(1); // 1 sec pause after each iteration
	// http.get("https://test.k6.io/contacts.php");
	// sleep(2);
}
