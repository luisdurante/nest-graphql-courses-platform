import { DataSource } from 'typeorm';
import { User } from './entities/user.entity';
import { DatabaseProvidersConstants } from 'src/constants';

export const userProviders = [
  {
    provide: DatabaseProvidersConstants.USERS,
    useFactory: (dataSource: DataSource) => dataSource.getRepository(User),
    inject: ['DATA_SOURCE'],
  },
];
