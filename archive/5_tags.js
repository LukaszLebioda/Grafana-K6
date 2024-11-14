// TAGS => important way of debugging failed test results

// -----------------------------

// // SYSTEM TAGS (in-built k6 tags)
// // in this scenario we sent 2 requests, and only one is failing
// // which one?
// // that is why we can use system tags of K6 to mark requests and read the results easier
// // or we can create our own custom tags

// import http from "k6/http";

// export const options = {
// 	thresholds: {
// 		http_req_duration: ["p(95)<1000"],
// 		// in { } we provide on of the system tags K6 has to offer
// 		"http_req_duration{ status:200 }": ["p(95)<1000"],
// 		"http_req_duration{ status:201 }": ["p(95)<1000"],
// 	},
// };

// // https://mocky.io (to generate fake endpoints)
// // for the 2nd request we use additional param to simulate a delay,
// // that make this 2nd req to fail
// export default function () {
// 	// 2 requests, 1 will fail, wich one?
// 	http.get("https://run.mocky.io/v3/465cc2f6-856d-4873-a137-a619a240865e");
// 	http.get(
// 		"https://run.mocky.io/v3/22ec6608-648c-450d-8530-90719599f28e?mocky-delay=2000ms"
// 	);
// }

// -----------------------------

// CUSTOM TAGS (our own tags)

import http from "k6/http";
import { Counter } from "k6/metrics";
import { check, sleep } from "k6";

export const options = {
	thresholds: {
		http_req_duration: ["p(95)<300"],
		// custom tag for request
		"http_req_duration{page:order}": ["p(95)<200"],
		http_errors: ["count==0"],
		// tag for custom metric
		checks: ["rate>=0.99"],
		"http_errors{page: order}": ["count==0"],
		// custom tag for checks
		"checks{page:order}": ["rate>=0.99"],
	},
};

// custom metric
let httpErrors = new Counter("http_errors");

export default function () {
	let res = http.get(
		"https://run.mocky.io/v3/6af27f19-50bb-496e-ba32-36289bf26a89"
	);

	// and we can finally tag a metric itself
	if (res.error) {
		httpErrors.add(1, {
			page: "order",
		});
	}

	check(res, {
		"status is 200": (r) => r.status === 200,
	});

	// Submit order with delay on purpose
	// we are only custom tagging this request
	res = http.get(
		"https://run.mocky.io/v3/56ade7de-5b8d-4278-889f-1cdb7423c567?mocky-delay=2000ms",
		{
			tags: {
				page: "order",
			},
		}
	);

	if (res.error) {
		httpErrors.add(1, { page: "order" });
	}

	// we can also tag checks as well
	check(
		res,
		{
			"status is 201": (r) => r.status === 201,
		},
		{ page: "order" }
	);

	sleep(1);
}
