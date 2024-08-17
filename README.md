# intallation

brew install k6

# running the tests

k6 run filename.js

# vocabulary

VU => virtual user

LATENCY => time between sending request and getting response (low latency - good, high latency - bad)

PERCENTILE => 'p(90)= 402.87ms' means that 90% of the requests are equal or lower than 402.87ms; if a baby is on 55th percentile, that means that 55% of all babies are smaller or equal to the baby;

ramp up / ramp down - increase / decrease of the number of users; in this phase we test the scalability of the system

scaling => expanding the system's ability to handle growing number of traffic;
vertical scaling => improving a server (adding more memory, using faster CPU) (less elastic, more limite, sometimes sits idle and we spend money pointlessly, better for monolitic architecture which can not be deployed on multiple servers);
horizontal scaling => adding more servers (more elastic and reasonable, but better for microservice architecture that can be deployed to multiple servers; this solution is offered by cloud providers; you pay for what you use);

THROUGHPUT => how many requests can a website handle within given time (high throughout - good, low throughput - bad)

SERVICE-LEVEL OBJECTIVE (SLO) => established limits of an app, eg. what the latency should be etc.:
'the application will be available 99.8% of the time'
'90% of responses are within 0.5 s'
'95% of responses are within 0.9 s'
'99% of responses are within 2.5 s'

# performance test types

SMOKE => checking if the app (or script) is working and has no fundamental issues; checking basic functionalities of the app, checking server responses etc.; establishing baselines (the performance will not get any better with more users);
LOAD => many users concurrently; the load should be typical (as planned and designed); tests last longer; number of users increase / decrease gradually; this is the basic type of tests, that should be run after every app change to make sure that the app's performance has not degraded;
STRESS => verify how many users our app can handle before it breaks; we take a closer look at the ramp down to see if the app can recover
SPIKE => suddenly increase / decrease the load on the system
