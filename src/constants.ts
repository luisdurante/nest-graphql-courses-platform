export namespace PostgresConstants {
  export const TYPE = 'postgres';
  export const HOST = process.env.POSTGRES_HOST;
  export const PORT = +process.env.POSTGRES_PORT;
  export const USERNAME = process.env.POSTGRES_USER;
  export const PASSWORD = process.env.POSTGRES_PASS;
  export const DATABASE = process.env.POSTGRES_DATABASE;
  export const SYNCHRONIZE = true;
}
