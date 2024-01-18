
import http from 'k6/http'
import { sleep } from 'k6'

export const options = {
    // 1 user is enough for smoke test
    vus: 1,
    duration: '30s'
}

// in the function we have 3 requests
// K6 will go through it with as many iterations as possible within the time given
export default function() {
    http.get('https://test.k6.io')
    sleep(1)
    http.get('https://test.k6.io/contact.php')
    sleep(2)
    http.get('https://test.k6.io/news.php')
    sleep(2)
}

// in the metrics we check http_req_failed - it should be 0.00%

