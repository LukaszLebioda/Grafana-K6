// general import of K6
import http from 'k6/http'
// import of sleep function used to tell k6 that it should wait
import { sleep } from 'k6'

// an object to specify number of vu's and test duration
export const options = {
    vus: 10,
    duration: '10s'
}

// default function to call a request to a specific URL
export default function() {
    http.get('https://test.k6.io')
    // sleep function (seconds)
    sleep(1)
}
