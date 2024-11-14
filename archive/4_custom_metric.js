// CUSTOM METRICS

// THERE ARE 5 STEPS OF CREATING A METRIC

/*
STEP1
we need to understand what kind of metric we want to create
and make sure it's not already delivered by k6 itself
we need a source of information, and the best one is "response"
we want to follow a scenario that we're sending multiple requests (as usual), but one of the requests should be dedicated
to a very important page for us: the "news" page
e.g. we want to know the timings, but not in general, but for
this particular page
*/

import http from "k6/http";
import { sleep } from "k6";
import { Counter, Trend } from "k6/metrics"; // STEP2: importing metrics modules we are interested in (that correspond with one of the k6-supported methods: value, gauge, count or trend)

export const options = {
	vus: 5,
	duration: "5s",
	thresholds: {
		http_req_duration: ["p(90)<2000", "p(95)<2500"],
		// STEP4: defining treshold for our custom metric
		my_counter: ["count>5"],
		response_time_news_page: ["p(95)<300", "p(99)< 250"],
	},
};

// STEP3: initialize our custom metric
// (param: name will be displayed in report)
let myCounter = new Counter("my_counter");
let newsPageResponseTrend = new Trend("response_time_news_page");

export default function () {
	const response = http.get("https://test.k6.io");
	// STEP3: using the defined custom metric and invoking "add" method (add, because it counts); in this case this metric simply counts how many times we got into the default function;
	myCounter.add(1); // 1: the number of counts
	sleep(1);

	const response2 = http.get("https://test.k6.io/news.php");
	console.log(response2.timings.duration);
	newsPageResponseTrend.add(response2.timings.duration);
	sleep(1);
}
