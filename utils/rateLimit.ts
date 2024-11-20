// rateLimit.js

const RATE_LIMIT_WINDOW = 60 * 1000; // 60 seconds
const MAX_REQUESTS = 15; // Max requests per window

// In-memory store for request counts (to simulate a basic rate limiter)
let requestStore = new Map();

export function rateLimit(ip: string | undefined) {
  const now = Date.now();

  let ipData = requestStore.get(ip);

  // If there's no data for this IP, initialize it
  if (!ipData) {
    ipData = {
      count: 0,
      firstRequestTime: now,
    };
    requestStore.set(ip, ipData);
  }

  // If the current request is beyond the time window, reset the counter
  if (now - ipData.firstRequestTime > RATE_LIMIT_WINDOW) {
    ipData.count = 0;
    ipData.firstRequestTime = now;
  }

  // If the request count exceeds the limit, return true (rate-limited)
  if (ipData.count >= MAX_REQUESTS) {
    return true;  // Rate limit exceeded
  }

  // Increment the request count for this IP
  ipData.count += 1;

  // No rate limit exceeded
  return false;
}