import { z } from "zod";

const restartSchema = z.literal("on-failure");

export const serviceSchema = z.object({
  image: z.string(),
  restart: restartSchema,
  environment: z.record(z.string()).optional(),
});
export type ServiceDefinition = z.infer<typeof serviceSchema>;

export const postgresSchema = serviceSchema.extend({
  image: z.literal("postgres:latest"),
  environment: z.object({
    POSTGRES_USER: z.string().default("postgres"),
    POSTGRES_PASSWORD: z.string().default("postgres"),
    POSTGRES_DB: z.string().default("postgres"),
  }),
  ports: z.tuple([z.literal("5432:5432")]),
  volumes: z
    .array(z.string())
    .default(["postgres_data:/var/lib/postgresql/data"]),
});
export type PostgresSchema = z.infer<typeof postgresSchema>;
export const defaultPostgresServiceDefinition: PostgresSchema = {
  image: "postgres:latest",
  restart: "on-failure",
  ports: ["5432:5432"],
  environment: {
    POSTGRES_DB: "postgres",
    POSTGRES_PASSWORD: "postgres",
    POSTGRES_USER: "postgres",
  },
  volumes: ["postgres_data:/var/lib/postgresql/data"],
};

export const mysqlSchema = serviceSchema.extend({
  image: z.literal("mysql:latest"),
  environment: z.object({
    MYSQL_USER: z.string(),
    MYSQL_PASSWORD: z.string(),
    MYSQL_DB: z.string(),
  }),
  ports: z.tuple([z.literal("3306:3306")]),
  volumes: z.array(z.string()).default(["mysql_data:/var/lib/mysql"]),
});
export type MysqlSchema = z.infer<typeof mysqlSchema>;
export const defaultMysqlServiceDefinition: MysqlSchema = {
  image: "mysql:latest",
  restart: "on-failure",
  ports: ["3306:3306"],
  environment: {
    MYSQL_USER: "mysql",
    MYSQL_PASSWORD: "mysql",
    MYSQL_DB: "mysql",
  },
  volumes: ["mysql_data:/var/lib/mysql"],
};

export const mailpitSchema = serviceSchema.extend({
  image: z.literal("axllent/mailpit:latest"),
  container_name: z.literal("mailpit"),
  ports: z.tuple([z.literal("1025:1025"), z.literal("8025:8025")]),
});
export type MailpitSchema = z.infer<typeof mailpitSchema>;
export const defaultMailpitServiceDefinition: MailpitSchema = {
  image: "axllent/mailpit:latest",
  restart: "on-failure",
  container_name: "mailpit",
  ports: ["1025:1025", "8025:8025"],
};

export const composeSchema = z.object({
  services: z.object({
    postgres: postgresSchema.optional(),
    mysql: mysqlSchema.optional(),
    mailpit: mailpitSchema.optional(),
  }),
  volumes: z.record(z.null()),
});
export type ComposeFileSchema = z.infer<typeof composeSchema>;
