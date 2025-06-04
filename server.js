import Fastify from 'fastify'
import cors from '@fastify/cors'
import homeRoutes from './routes/homeRouter.js'
import apiRoutes from './routes/apiRouter.js'
import sessionRoutes from './routes/sessionRouter.js'
import dotenv from 'dotenv'

dotenv.config({ path: './config.env' })

const fastify = Fastify({
  logger: {
    level: 'info',
    transport: {
      target: 'pino-pretty',
      options: {
        colorize: true,
        translateTime: 'SYS:yyyy-mm-dd HH:MM:ss Z',
        ignore: 'pid,hostname,reqId,req,res,err,responseTime',
        messageFormat: '{req.method} {req.url} → {res.statusCode}; {err.type} -> {err.message}'
      }
    }
  }
})

//CORS
await fastify.register(cors, {
  origin: ['http://localhost', 'http://127.0.0.1', 'http://192.168.0.155'],
  credentials: true
})

// Register routers
fastify.register(homeRoutes, { prefix: '/home' })
fastify.register(apiRoutes, { prefix: '/api' })
fastify.register(sessionRoutes, { prefix: '/session' })

// Start server
const start = async () => {
  try {
    await fastify.listen({ port: process.env.GATEWAY_PORT })
    console.log(`Server running on http://localhost:${process.env.GATEWAY_PORT}`)
  } catch (err) {
    fastify.log.error(err)
    process.exit(1)
  }
}

start()
