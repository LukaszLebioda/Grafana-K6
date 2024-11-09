# intallation

brew install k6

# running the tests

k6 run filename.js
npm run k6

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

## smoke

SMOKE => checking if the app (or script) is working and has no fundamental issues; checking basic functionalities of the app, checking server responses etc.; establishing baselines (the performance will not get any better with more users);

## load

LOAD => many users concurrently; the load should be typical, based on empirical data if possible (as planned and designed); tests last longer; number of users increase / decrease gradually; this is the basic type of tests, that should be run after every app change to make sure that the app's performance has not degraded;

## stress

STRESS => load is higher than average; verify how many users our app can handle before it starts losing performance; we take a closer look at the ramp down to see if the app can recover; important to test the load during forseen increase number of vu's (like during black fridays etc.);

## spike

SPIKE => suddenly increase / decrease the load on the system; this can be expected or unexpected, like when a famous youtuber mentions our product or there's tv commercial during super bowl etc.; the increase is far above the limits established by load tests and stress tests; ramp-up stage is very limited; we kind of expect the app to fail and verify if the app / infrastructure will recover;(it probably won't);

## breakpoint

BREAKPOINT => we establish a limit, over which our app breaks; we establish a load that our app can handle without crashing; we establish a maximum capacity of our app; it gradually increases the load from zero up to very high values; it has only one stage; this kind of tests need constant monitoring - app can crash rapidly, or just reach unacceptable error rate or response times; it should be done only successful load and stress tests;

## soak (endurance)

SOAK (ENDURANCE) => tests are ran for an extended period of time; it's a variation of load test, but last much longer; ramp-up & ramp-down stages can stay the same, but we extend the flat stage; we test our app against memory leaks (a programm can allocate some more memory temporarily when it needs it; but when it doesn't need any extra memory, sometimes it doesn't free this memory, causing the performance to decrease over time; ultimately the app can run out of memory completely and crash) or availability of disk space (when our app creates lots of logs, cashes or database entries it may happen, than disk will run out of space);
