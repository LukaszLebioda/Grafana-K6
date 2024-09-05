import http from "k6/http";
import { check } from "k6";

export default function () {
	const response = http.get("https://test.k6.io");
	console.log(response.status);
	// console.log(response.body);

	// check(false, {
	// 	"true is true": (value) => value === true,
	// });

	check(true, {
		"true is true": (value) => value === true,
	});
}
