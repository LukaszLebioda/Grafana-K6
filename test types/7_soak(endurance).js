import http from "k6/http";
import { sleep } from "k6";

// ramp up equals ramp down
// prolongued middle phase

export const options = {
  stages: [
    {
      duration: "5m",
      target: 1000,
    },
    {
      duration: "48h", // even much longer
      target: 1000,
    },
    {
      duration: "5m",
      target: 0,
    },
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
