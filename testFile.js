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
// 			target: 0, // ramp down
// 		},
// 	],
// }

export default function () {
	http.get('https://test.k6.io')
	sleep(1)
}
