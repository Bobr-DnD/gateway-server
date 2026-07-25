import fp from 'fastify-plugin'
import rateLimit from '@fastify/rate-limit'

export default fp(async function customRateLimit(fastify, opts) {
  await fastify.register(rateLimit, {
    max: Number(process.env.RATE_LIMIT_MAX) || 1500,
    timeWindow: (Number(process.env.RATE_LIMIT_WINDOW_SECONDS) || 1) * 1000,
    ban: Number(process.env.RATE_LIMIT_BAN) || undefined,
    cache: 10000,
    allowList: process.env.RATE_LIMIT_ALLOWLIST
      ?.split(',')
      .map(ip => ip.trim()),
    errorResponseBuilder: (request, context) => ({
      statusCode: 429,
      error: 'Too Many Requests',
      message: `Rate limit exceeded, retry in ${context.after}`
    })
  })
})
