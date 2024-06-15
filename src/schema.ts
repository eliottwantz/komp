import { z } from "zod";

const restartSchema = z
  .enum(["on-failure", "always", "unless-stopped"])
  .default("on-failure");

export const serviceSchema = z.object({
  image: z.string(),
  restart: restartSchema,
  environment: z.record(z.string()),
});
export type ServiceDefinition = z.infer<typeof serviceSchema>;

export const postgresSchema = serviceSchema.extend({
  image: z.literal("postgres:latest"),
  environment: z.object({
    POSTGRES_USER: z.string().default("postgres"),
    POSTGRES_PASSWORD: z.string().default("postgres"),
    POSTGRES_DB: z.string().default("postgres"),
  }),
});
export type PostgresSchema = z.infer<typeof postgresSchema>;
export const defaultPostgresServiceDefinition: PostgresSchema = {
  image: "postgres:latest",
  restart: "on-failure",
  environment: {
    POSTGRES_DB: "postgres",
    POSTGRES_PASSWORD: "postgres",
    POSTGRES_USER: "postgres",
  },
};

export const mysqlSchema = serviceSchema.extend({
  image: z.literal("mysql:latest"),
  environment: z.object({
    MYSQL_USER: z.string(),
    MYSQL_PASSWORD: z.string(),
    MYSQL_DB: z.string(),
  }),
});
export type MysqlSchema = z.infer<typeof mysqlSchema>;
export const defaultMysqlServiceDefinition: MysqlSchema = {
  image: "mysql:latest",
  restart: "on-failure",
  environment: {
    MYSQL_USER: "mysql",
    MYSQL_PASSWORD: "mysql",
    MYSQL_DB: "mysql",
  },
};

export const composeSchema = z.object({
  services: z.object({
    postgres: postgresSchema.optional(),
    mysql: mysqlSchema.optional(),
  }),
});
export type ComposeFileSchema = z.infer<typeof composeSchema>;

let f: ComposeFileSchema = {
  services: {
    postgres: {
      image: "postgres:latest",
      restart: "on-failure",
      environment: {
        POSTGRES_DB: "postgres",
        POSTGRES_PASSWORD: "postgres",
        POSTGRES_USER: "postgres",
      },
    },
  },
};
