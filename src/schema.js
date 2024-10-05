export const defaultPostgresServiceDefinition = {
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
export const defaultMysqlServiceDefinition = {
    image: "mysql:latest",
    restart: "on-failure",
    ports: ["3306:3306"],
    environment: {
        MYSQL_ROOT_PASSWORD: "root",
        MYSQL_DATABASE: "mydb",
    },
    volumes: ["mysql_data:/var/lib/mysql"],
};
export const defaultMailpitServiceDefinition = {
    image: "axllent/mailpit:latest",
    restart: "on-failure",
    container_name: "mailpit",
    ports: ["1025:1025", "8025:8025"],
};
