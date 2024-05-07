# intallation

brew install k6

# running the tests

k6 run filename.js

# vocabulary

vu => virtual user

latency => time between sending request and getting response

scaling => expanding the system's ability to handle growing number of traffic
vertical scaling => improving a server (adding more memory, using faster CPU) (less elastic, sometimes sits idle, better for monolitic architecture)
horizontal scaling => adding more servers (more elastic and reasonable, but better for microservice architecture)

throughput => how many requests can a website handle within given timeframe

service-level objective (SLO) => established limits of an app, e.g.
'90% of responses are within 0.5 s'
'95% of responses are within 0.9 s'
'99% of responses are within 2.5 s'

# performance test types

SMOKE => check if the app (or script) is working and has no fundamental issues
LOAD => many users at concurrently
STRESS => verify how many users our app can handle before it breaks
SPIKE => suddenly increase / decrease the load on the system
