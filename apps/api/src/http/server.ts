import fastifyCors from "@fastify/cors";
import { fastify } from "fastify";
import fastifySwagger from "@fastify/swagger";
import {
  jsonSchemaTransform,
  serializerCompiler,
  validatorCompiler,
  ZodTypeProvider,
} from "fastify-type-provider-zod";
import { createAccount } from "./routes/auth/create-account";
import fastifySwaggerUi from "@fastify/swagger-ui";

const loggerConfig = {
  development: {
    transport: {
      target: "pino-pretty",
    },
  },
};

const app = fastify({
  logger: loggerConfig["development"],
  disableRequestLogging: true,
}).withTypeProvider<ZodTypeProvider>();

app.setValidatorCompiler(validatorCompiler);
app.setSerializerCompiler(serializerCompiler);

app.register(fastifySwagger, {
  openapi: {
    info: {
      title: "Next.js SaaS",
      description: "Full-stack SaaS app with multi-tenant & RBAC",
      version: "1.0.0",
    },
    servers: [],
  },
  transform: jsonSchemaTransform,
});

app.register(fastifySwaggerUi, { routePrefix: "/docs" });

app.register(fastifyCors);
app.register(createAccount);

app.listen({ port: 3333 }).then(() => {
  app.log.info("🚀 HTTP server running!");
});
