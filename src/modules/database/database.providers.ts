import { DataSource } from 'typeorm';
import { PostgresConstants } from '../../constants';

export const postgesDataSource = new DataSource({
  type: PostgresConstants.TYPE,
  host: PostgresConstants.HOST,
  port: PostgresConstants.PORT,
  username: PostgresConstants.USERNAME,
  password: PostgresConstants.PASSWORD,
  database: PostgresConstants.DATABASE,
  entities: [__dirname + '/../**/*.entity.js'],
  migrations: [],
  synchronize: PostgresConstants.SYNCHRONIZE,
});

export const databaseProviders = [
  {
    provide: 'DATA_SOURCE',
    useFactory: async () => {
      return postgesDataSource.initialize();
    },
  },
];
