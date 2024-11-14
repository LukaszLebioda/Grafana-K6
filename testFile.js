import http from "k6/http"; // http library for making http requests
// import { sleep } from "k6";

// export const options = {
// 	stages: [
// 		{ duration: "10s", target: 10 },
// 		{ duration: "30s", target: 10 },
// 		{ duration: "10s", target: 0 },
// 	],
// };

export default function () {
	const response = http.get("https://test.k6.io");
	// console.log(response.status, response.body);

	// sleep(1);
	// http.get("https://test.k6.io/contacts.php");
	// sleep(2);
	// http.get("https://test.k6.io/news.php");
	// sleep(2);
}
