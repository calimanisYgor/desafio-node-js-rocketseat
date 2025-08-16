import fastify from "fastify";
import {
  validatorCompiler,
  serializerCompiler,
  type ZodTypeProvider,
  jsonSchemaTransform,
} from "fastify-type-provider-zod";
import { fastifySwagger } from "@fastify/swagger";
import { createCoursesRoute } from "./routes/create-courses.ts";
import { getCoursesRoute } from "./routes/get-courses.ts";
import { getCoursesByIdRoute } from "./routes/get-courses-by-id.ts";
import  scalarAPIReference  from "@scalar/fastify-api-reference"

export const server = fastify({
  logger: {
    transport: {
      target: "pino-pretty",
      options: {
        translateTime: "HH:MM:ss Z",
        ignore: "pid,hostname",
      },
    },
  },
}).withTypeProvider<ZodTypeProvider>();

if (process.env.NODE_ENV === "development") {
  server.register(fastifySwagger, {
    openapi: {
      info: {
        title: "Desafio Node.Js",
        version: "1.0.0",
      },
    },
    transform: jsonSchemaTransform,
  });
  server.register(scalarAPIReference, {
    routePrefix: '/docs',
    configuration:{
      theme: 'bluePlanet'
    }
  })
}

server.setValidatorCompiler(validatorCompiler);
server.setSerializerCompiler(serializerCompiler);

server.register(createCoursesRoute);
server.register(getCoursesRoute);
server.register(getCoursesByIdRoute);
