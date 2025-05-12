import http from 'k6/http';
import { check, sleep } from 'k6';

export let options = {
  stages: [
    { duration: '30s', target: 50 },  // ramp-up to 50 users
    { duration: '1m', target: 50 },   // hold 50 users for 1 minute
    { duration: '30s', target: 0 },   // ramp-down
  ],
};

export default function () {
  let res = http.get('http://localhost:3000/property/');  // your backend API
  check(res, {
    'status is 200': (r) => r.status === 200,
    'response time < 200ms': (r) => r.timings.duration < 200,
  });
  sleep(1); // simulate user wait time
}
