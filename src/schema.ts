export type ServiceDefinition = {
  image: string;
  restart: "on-failure";
  environment?: Record<string, string>;
};

export type PostgresSchema = {
  image: "postgres:latest";
  environment: {
    POSTGRES_DB: string;
    POSTGRES_PASSWORD: string;
    POSTGRES_USER: string;
  };
  ports: ["5432:5432"];
  volumes: ["postgres_data:/var/lib/postgresql/data"];
} & ServiceDefinition;

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

export type MysqlSchema = {
  image: "mysql:latest";
  environment: {
    MYSQL_USER: string;
    MYSQL_PASSWORD: string;
    MYSQL_DB: string;
  };
  ports: ["3306:3306"];
  volumes: ["mysql_data:/var/lib/mysql"];
} & ServiceDefinition;

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

export type MailpitSchema = {
  image: "axllent/mailpit:latest";
  container_name: "mailpit";
  ports: ["1025:1025", "8025:8025"];
} & ServiceDefinition;

export const defaultMailpitServiceDefinition: MailpitSchema = {
  image: "axllent/mailpit:latest",
  restart: "on-failure",
  container_name: "mailpit",
  ports: ["1025:1025", "8025:8025"],
};

export type ComposeFileSchema = {
  services: {
    postgres?: PostgresSchema;
    mysql?: MysqlSchema;
    mailpit?: MailpitSchema;
  };
  volumes: {
    [key: string]: null;
  };
};
