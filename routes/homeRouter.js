export default async function homeRoutes(fastify, options) {
  fastify.get('/', async (request, reply) => {
    return { message: 'Welcome to the Home Page' }
  })
}
