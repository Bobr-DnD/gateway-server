// proxy.js
import fastifyHttpProxy from '@fastify/http-proxy'

export default async function (fastify, opts) {
  fastify.register(fastifyHttpProxy, {
    upstream: `http://localhost:${process.env.API_PORT}`,
    prefix: '/api',
    rewritePrefix: '/',
    http2: false,
    logLevel: 'silent'
  })

  fastify.register(fastifyHttpProxy, {
    upstream: `http://localhost:${process.env.SESSION_PORT}`,
    prefix: '/session',
    rewritePrefix: '/',
    http2: false,
    logLevel: 'silent'
  })
}
