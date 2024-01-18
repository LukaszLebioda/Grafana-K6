import http from "k6/http";
import { sleep } from "k6";

// load should be increased gradually
// not 1000 VU's, but 100, 500 etc. and only then 1000
export const options = {
  stages: [
    {
      duration: "10s",
      target: 1000,
    },
    {
      duration: "30s",
      target: 1000,
    },
    {
      duration: "10s",
      target: 0,
    },
  ],
};

export default function () {
  http.get("https://test.k6.io");
  sleep(1);
}
