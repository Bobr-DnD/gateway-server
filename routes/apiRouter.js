export default async function apiRoutes(fastify, options) {
  fastify.get('/', async (request, reply) => {
    return { message: 'API Root' }
  })

  fastify.get('/status', async (request, reply) => {
    return { status: 'ok' }
  })
}
