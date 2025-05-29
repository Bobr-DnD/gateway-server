import Fastify from 'fastify'

const route = Fastify({
  logger: true
})

// Declare a route
route.get('/', async function handler (request, reply) {
  return { hello: 'world' }
})

export {route}