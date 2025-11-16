import fastifyHttpProxy from '@fastify/http-proxy'
import fastifyReplyFrom from '@fastify/reply-from'

export default async function (fastify, opts) {
  fastify.register(fastifyHttpProxy, {
    upstream: `http://localhost:${process.env.API_PORT}`,
    prefix: '/api',
    rewritePrefix: '/',
    http2: false,
    logLevel: 'silent'
  })

  fastify.register(fastifyHttpProxy, {
    upstream: `http://localhost:${process.env.WS_PORT}`,
    prefix: "/socket.io",
    websocket: true, 
    rewritePrefix: "/socket.io",
    http2: false,
    logLevel: 'silent'
  });
}
