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
import { authenticateWithPassword } from "./routes/auth/authenticate-with-password";
import fastifyJwt from "@fastify/jwt";
import { getProfile } from "./routes/auth/get-profile";
import { errorHandler } from "./error-handler";
import { requestPasswordRecover } from "./routes/auth/request-password-recover";
import { resetPassword } from "./routes/auth/reset-password";
import { authenticateWithGithub } from "./routes/auth/authenticate-with-github";
import { env } from "@saas/env";
import { createOrganization } from "./routes/orgs/create-organization";
import { getMembership } from "./routes/orgs/get-membership";
import { getOrganization } from "./routes/orgs/get-organization";
import { getOrganizations } from "./routes/orgs/get-organizations";
import { updateOrganization } from "./routes/orgs/update-organization";
import { shutdownOrganization } from "./routes/orgs/shutdown-organization";

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

app.setErrorHandler(errorHandler);

app.register(fastifySwagger, {
  openapi: {
    info: {
      title: "Next.js SaaS",
      description: "Full-stack SaaS app with multi-tenant & RBAC",
      version: "1.0.0",
    },
    components: {
      securitySchemes: {
        bearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT",
        },
      },
    },
  },
  transform: jsonSchemaTransform,
});

app.register(fastifySwaggerUi, { routePrefix: "/docs" });

app.register(fastifyJwt, { secret: env.JWT_SECRET });

app.register(fastifyCors);

app.register(createAccount);
app.register(authenticateWithPassword);
app.register(getProfile);
app.register(requestPasswordRecover);
app.register(resetPassword);
app.register(authenticateWithGithub);
app.register(createOrganization);
app.register(getMembership);
app.register(getOrganization);
app.register(getOrganizations);
app.register(updateOrganization);
app.register(shutdownOrganization);

app.listen({ port: env.SERVER_PORT }).then(() => {
  app.log.info("🚀 HTTP server running!");
});
