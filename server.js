import Fastify from 'fastify'
import cors from '@fastify/cors'
import dotenv from 'dotenv'
import customLogger from './plugins/logger.js'
import proxy from './utils/proxy.js'

dotenv.config({ path: './config.env' })

const fastify = Fastify({
  logger: {
    level: 'info',
    transport: {
      target: 'pino-pretty',
      options: {
        colorize: true,
        translateTime: 'SYS:yyyy-mm-dd HH:MM:ss Z',
        ignore: 'pid,hostname,reqId,req,res,err,responseTime'
      }
    }
  },
  disableRequestLogging: true
})

//CORS
await fastify.register(cors, {
  origin: ['http://localhost', 'http://127.0.0.1', 'http://192.168.0.155'],
  credentials: true
})
//Logger
await fastify.register(customLogger)

// Register routers
fastify.register(proxy)

// Start server
const start = async () => {
  try {
    await fastify.listen({ port: process.env.GATEWAY_PORT })
  } catch (err) {
    fastify.log.error(err)
    process.exit(1)
  }
}

start()
