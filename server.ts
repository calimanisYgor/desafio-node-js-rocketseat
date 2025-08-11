import fastify from "fastify";
import crypto from "node:crypto";
const server = fastify({
    logger: {
      transport: {
        target: 'pino-pretty',
        options: {
          translateTime: 'HH:MM:ss Z',
          ignore: 'pid,hostname',
        },
      },
    },
  })

const courses = [
  { id: "1", title: "Curso Node.Js" },
  { id: "2", title: "Curso React" },
  { id: "3", title: "Curso React Native" },
];

server.get("/courses", () => {
  return { courses };
});

server.get("/courses/:id", (request, reply) => {
  type Params = {
    id: string;
  };

  const params = request.params as Params;

  const courseId = params.id;

  const course = courses.find((course) => course.id === courseId);

  if (course) {
    return { course };
  }

  return reply.status(401).send();
});

server.post("/courses", (request, reply) => {
  type Body = {

  };
  const courseId = crypto.randomUUID();
  courses.push({ id: courseId, title: "curso" });

  return reply.status(201).send(courseId);
});

server.listen({ port: 3333 }).then(() => {
  console.log("HTTP srever running!");
});
