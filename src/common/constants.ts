import { User } from '../modules/users/entities/user.entity';

export namespace PostgresConstants {
  export const TYPE = 'postgres';
  export const HOST = process.env.POSTGRES_HOST;
  export const PORT = +process.env.POSTGRES_PORT;
  export const USERNAME = process.env.POSTGRES_USER;
  export const PASSWORD = process.env.POSTGRES_PASS;
  export const DATABASE = process.env.POSTGRES_DATABASE;
  export const ENTITIES = [User];
  export const SYNCHRONIZE = true;
}

export namespace JwtConstants {
  export const SECRET = process.env.JWT_SECRET;
  export const TTL = process.env.JWT_TTL;
}
