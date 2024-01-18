
import http from 'k6/http'
import { sleep } from 'k6'

// real total duration => 60 minutes
// for load tests we have to define stages
// within each stage is a target (instead of 'vus')
// ramp-up stage & ramp-down stage should last 10% of the total duration each
// export const options = {
//     stages: [
//         {
//             duration: '5m',
//             target: 100
//         },
//         {
//             duration: '50m',
//             target: 100
//         },
//         {
//             duration: '5m',
//             target: 0
//         }
//     ]
//     // vus: 100,
//     // duration: '30m'
// }

//----------------------------------------------

// fake total duration => 50 seconds
// there are not always three stages, can be more depending on what we actually want to simulate
// eg. during night => small traffic, in the morning => peak, then slow decrease => till afternoon
// evening => peak again, flat => till midnight and so on
export const options = {
    stages: [
        {
            duration: '10s',
            target: 10
        },
        {
            duration: '30s',
            target: 10
        },
        {
            duration: '10s',
            target: 0
        }
    ]
    // this is commented out cause otherwise we would send 100 VU at once
    // vus: 100,
    // duration: '30m'
}

export default function() {
    http.get('https://test.k6.io')
    sleep(1)
    // http.get('https://test.k6.io/contact.php')
    // sleep(2)
    // http.get('https://test.k6.io/news.php')
    // sleep(2)
}


