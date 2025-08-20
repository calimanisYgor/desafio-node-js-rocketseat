import type { FastifyRequest, FastifyReply } from 'fastify'
import { getAuthenticateUserFromRequest } from '../../utils/get-autheticated-user-from-request.ts'

export async function checkUserRole(request: FastifyRequest, reply: FastifyReply) {
  const user = getAuthenticateUserFromRequest(request)

  if (user.role !== 'manager'){
    return reply.status(401).send()
  }
}