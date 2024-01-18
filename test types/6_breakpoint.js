import http from "k6/http";
import { sleep } from "k6";

// gradually increase of the load until the app breaks
// no middle and ramp down phases needed
// target is so extreme, that the app will never handle it
/* the problem is that K6 will not provide us with any metrics unless we manually stop the test
so what we would do is to make K6 export the data to a file or external server where the metrics can be watched in real time
*/

export const options = {
  stages: [
    {
      duration: "2h", // it can be much longer
      target: 10000, // normally we would use like 100000000000, but the grafana test page won't handle it
    },
    // {
    //   duration: "30s",
    //   target: 1000,
    // },
    // {
    //   duration: "15s",
    //   target: 0,
    // },
  ],
};

export default function () {
  http.get("https://test.k6.io");
  sleep(1);
  // http.get('https://test.k6.io/contact.php')
  // sleep(2)
  // http.get('https://test.k6.io/news.php')
  // sleep(2)
}
