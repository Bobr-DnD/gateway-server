export default async function sessionRoutes(fastify, options) {
  fastify.get('/', async (request, reply) => {
    return { session: 'session info (example)' }
  })

  fastify.post('/login', async (request, reply) => {
    const { username, password } = request.body
    // You’d handle auth logic here
    
    return { success: true, user: 'test' }
  })

  fastify.post('/logout', async (request, reply) => {
    return { success: true }
  })
}
