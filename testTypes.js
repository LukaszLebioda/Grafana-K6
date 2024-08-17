// // SMOKE TEST
// import http from "k6/http";
// import { sleep } from "k6";

// export const options = {
// 	vus: 1,
// 	duration: "30s",
// };

// export default function () {
// http.get("https://test.k6.io");
// sleep(1);
// http.get("https://test.k6.io/contacts.php");
// sleep(2);
// http.get("https://test.k6.io/news.php");
// sleep(2);
// }

//----------

// // LOAD TEST
// import http from "k6/http";
// import { sleep } from "k6";

// export const options = {
// 	stages: [
// 		{
// 			duration: "10s", // ramp-up stage, ca. 10% of total test time
// 			target: 10, // ramp up
// 		},
// 		{
// 			duration: "30s",
// 			target: 10, // duration
// 		},
// 		{
// 			duration: "10s", // // ramp-down stage, ca. 10% of total test time
// 			target: 0, // ramp down
// 		},
// 	],
// };

// export default function () {
// 	http.get("https://test.k6.io");
// 	sleep(1);
// 	http.get("https://test.k6.io/contacts.php");
// 	sleep(2);
// 	http.get("https://test.k6.io/news.php");
// 	sleep(2);
// }

// ---------

// // STRESS TEST
// import http from 'k6/http'
// import { sleep } from 'k6'

// export const options = {
// 	stages: [
// 		{
// 			duration: '5m',
// 			target: 1000, // ramp up - much more vu's
// 		},
// 		{
// 			duration: '30m',
// 			target: 1000, // duration
// 		},
// 		{
// 			duration: '5m',
// 			target: 0, // ramp down - critical
// 		},
// 	],
// }

//----------
