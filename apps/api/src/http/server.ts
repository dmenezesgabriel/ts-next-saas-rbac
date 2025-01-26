import fastifyCors from "@fastify/cors";
import { fastify } from "fastify";
import {
  // jsonSchemaTransform,
  serializerCompiler,
  validatorCompiler,
  ZodTypeProvider,
} from "fastify-type-provider-zod";
import { createAccount } from "./routes/auth/create-account";

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

app.register(fastifyCors);
app.register(createAccount);

app.listen({ port: 3333 }).then(() => {
  app.log.info("🚀 HTTP server running!");
});
