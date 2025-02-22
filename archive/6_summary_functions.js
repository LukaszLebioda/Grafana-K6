import http from "k6/http";
import { check, sleep, group } from "k6";
import { Counter, Trend } from "k6/metrics"; // for custom metrics
import exec from "k6/execution"; // for aborting

export const options = {
	// ---------------------------------------

	vus: 10,
	duration: "3s",
	// 	stages: [
	// 		{ duration: "10s", target: 10 },
	// 		{ duration: "30s", target: 10 },
	// 		{ duration: "10s", target: 0 },
	// 	],

	// ---------------------------------------

	thresholds: {
		// regular, global thresholds metrics
		// in-build metric_name: ["metric_type: trend, counter, rate, gauge]<>value"]
		http_req_duration: ["p(95)<500"], // trend: 95% reqs should be < 300 ms
		"http_req_duration{expected_response:true}": ["p(95)<500"], // special tag to filter responses with 2xx-3xx status codes
		http_req_duration: ["max<3000"], // trend: 100% reqs should be < 3000 ms
		http_reqs: ["count>5"], // counter: at least 5 reqs have to be sent
		iterations: ["count>5"], // counter: at least 5 iterations have to be made
		http_req_failed: ["rate<0.01"], // rate: only 1% requests can fail
		http_reqs: ["rate>3"], // rate: at least 4 reqs/sec should be sent
		// vus: ["value>1"], // gauge: there should be at least 1 vu at every moment
		vus_max: ["value < 20"], // gauge: there should be max 20 vu at every moment

		// ---------------------------------------

		// unique threshold for checks (check functions)
		checks: ["rate>=0.99"], // rate: 98% cheks have to pass
		// unique threshold for custom metrics
		my_counter_metric: ["count>5"],
		my_trend_metric: ["p(95)<500", "p(99)<1000"],
		my_counter_errors: ["count==0"],

		// ---------------------------------------

		// system tag (in-built) for metrics, used to filer requests (e.g. for debugging) by those tags
		// metric_name{ system_tag: filter }: [ metric ]
		"http_req_duration{status:200}": ["p(95)<1000"], // displays metrics for status 200 separately;
		"http_req_duration{status:201}": ["p(95)<1000"], // displays metrics for status 200 separately, will report "0s" if expected status is not detected
		"http_req_duration{method:GET}": ["p(95)<1000"], // displays metrics for POST separately;
		"http_req_duration{method:POST}": ["p(95)<1000"], // displays metrics for POST separately, will report "0s" if expected method is not detected

		// ---------------------------------------

		// other tags, provided as params at the request itself
		"http_req_duration{page:order}": ["p(95)<1000"],
		// other tags, provided as params at the check itself
		"checks{page:order}": ["rate>=0.99"],
		// other tags, provided as params at the custom metric itself
		"my_counter_errors{page:order}": ["count==0"],

		// ---------------------------------------

		// tags for groups (yes, tripple colon...)
		"group_duration{group:::main group}": ["p(95)<2000"],
		"group_duration{group:::main group::nested group}": ["p(95)<2000"],
	},
};

// ---------------------------------------

// for custom metrics
let myCounter = new Counter("my_counter_metric");
let myTrend = new Trend("my_trend_metric");
let httpErrors = new Counter("my_counter_errors");

// ---------------------------------------

// virtual user stage -> code within default function
// will be executed for each virtual user (execution = iteration)
// data is being returned by setup function (below)
export default function (data) {
	// console.log(data);
	let response = http.get("https://test.k6.io/"); // use const, if variable is not re-used
	// console.log(response.status, response.body);

	// check for 1st request
	check(response, {
		"status code is 200": (res) => res.status === 200,
		"body contains header": (res) => res.body.includes("load testing"),
	});

	// for custom metrics 1
	myCounter.add(1); // counts how any times default function has been entered
	sleep(1); // 1 sec pause after each iteration

	// ---------------------------------------

	// for custom metric 2
	// also it has other tag (non system tag), that is used to tag requests
	response = http.get("https://test.k6.io/news.php", {
		tags: {
			page: "order",
		},
	});

	// check for 2nd request
	// also it has other tag (non system tag), that is used to tag checks
	check(
		response,
		{
			"status code is 200": (res) => res.status === 200,
		},
		{
			page: "order",
		}
	);

	// console.log(response.timings.duration);
	myTrend.add(response.timings.duration); // measures response timings for /news.php
	sleep(1);

	// ---------------------------------------

	// for custom metric 3
	// also it has other tag (non system tag), that is used to tag custom metrics
	if (response.error) {
		// just count errors
		httpErrors.add(1, {
			page: "order",
		});
	}

	// ---------------------------------------

	group("main group", function () {
		const response = http.get("https://test.k6.io/contacts.php");
		// mocky.io -> mocked request with delay
		// const response = http.get(
		// 	"https://run.mocky.io/v3/98098e47-d067-4ae8-b7ee-a17fc8ff70a9?mocky-delay=5000ms"
		// );

		check(response, {
			"status code is 200": (res) => res.status === 200,
		});

		group("nested group", function () {
			// requests can be made also for .css files or .js files or any other static assets
			// just locate a file in network devtools, right click and open in new tab
			http.get("https://test.k6.io/static/css/site.css");
			http.get("https://run.mocky.io/v3/93311983-b1dd-49bb-bfd1-9308f84044b6");
		});
	});
}

// setup function is called only once per test execution,
// before default function is executed
// it's often used to fetch test data from somewhere
// or to abort test when environment is not ready
export function setup() {
	console.log("Hello from the setup function :)");
	const data = { foo: "bar" };
	return data;
	// let res = http.get("https://test.k6.non-existing-url");
	// if (res.error) {
	// 	exec.test.abort("Aborting the test from setup function");
	// }
}

// teardown function is called only once at the end of test execution,
// it is used for cleaning up, removing environment etc.
// it also has access to data produced by setup function
export function teardown(data) {
	console.log("Hello from the teardown function :)");
}
