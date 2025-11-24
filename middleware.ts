import arcjet, { createMiddleware, shield, tokenBucket } from '@arcjet/next';

const aj = arcjet({
  key: process.env.ARCJET_KEY!,
});

export default createMiddleware(aj, [
  shield(), // basic injection/XSS protection
  tokenBucket({
    key: 'api',
    limit: { count: 100, interval: 60 }, // 100 req/min per IP
  }),
]);

export const config = {
  matcher: ['/api/:path*'],
};

