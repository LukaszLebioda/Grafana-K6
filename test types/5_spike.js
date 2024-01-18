import http from "k6/http";
import { sleep } from "k6";

// sudden spike of users within limited time
// no middle phase needed
// limited number of website pages
export const options = {
  stages: [
    {
      duration: "30", // normally we would use like 2m, but the grafana test page won't handle it
      target: 100, // normally we would use like 10000, but the grafana test page won't handle it
    },
    // {
    //   duration: "30s",
    //   target: 1000,
    // },
    {
      duration: "15s", // normally we would use like 1m, but the grafana test page won't handle it
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
