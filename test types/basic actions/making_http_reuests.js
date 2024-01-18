// making HTTP requests

// first we need to import http library
import http from "k6/http";

// using http object we get access to different http requests
// than we store request into variable to work with status codes, response body
export default function () {
  const res = http.get("https://test.k6.io");
  console.log("status code", res.status);
  // console.log("response body", res.body);
}
