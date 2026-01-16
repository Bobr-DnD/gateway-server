import fastifyHttpProxy from '@fastify/http-proxy'
import fastifyReplyFrom from '@fastify/reply-from'

export default async function (fastify, opts) {
  fastify.register(fastifyHttpProxy, {
    upstream: process.env.API_SERVER_URL,
    prefix: '/api',
    rewritePrefix: '/',
    http2: false,
    logLevel: 'silent'
  })

  fastify.register(fastifyHttpProxy, {
    upstream: process.env.WS_SERVER_URL,
    prefix: "/socket.io",
    websocket: true, 
    rewritePrefix: "/socket.io",
    http2: false,
    logLevel: 'silent'
  });
}
