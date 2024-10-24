// CUSTOM METRICS

// THERE ARE 5 STEPS OF CREATING A METRIC

/*
STEP1
we need to understand what kind of metric we want to create
we need a source of information, and the best one is "response"
we want to follow a scenario that one of the requests should be dedicated
to a very important pager: the "news" page
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
	},
};

let myCounter = new Counter("my_counter");
// STEP3: initialize our custom metric (param: name - will be displayed in report)
let newsPageResponseTrend = new Trend("response_time_news_page");

export default function () {
	const response = http.get("https://test.k6.io");
	console.log(response.timings.duration);

	myCounter.add(1); // 1: the number of counts
	// STEP3: using the defined custom metric and invoking "add" method (add, because it counts)
	newsPageResponseTrend.add();
	sleep(2);

	// https://test.k6.io.news.php
}
