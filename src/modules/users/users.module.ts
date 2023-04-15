import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersResolver } from './users.resolver';
import { userProviders } from './users.providers';
import { DatabaseModule } from '../database/database.module';
import { JwtStrategy } from '../auth/strategies/jwt.strategy';

@Module({
  imports: [DatabaseModule],
  providers: [UsersResolver, UsersService, ...userProviders],
  exports: [UsersService],
})
export class UsersModule {}
