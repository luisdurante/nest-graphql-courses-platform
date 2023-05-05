import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { join } from 'path';
import { ConfigModule } from '@nestjs/config';
import { UsersModule } from './modules/users/users.module';
import { DateResolver, DateTimeResolver } from 'graphql-scalars';
import { AuthModule } from './modules/auth/auth.module';
import { PostgresConstants } from './common/constants';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CoursesModule } from './modules/courses/courses.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
      type: PostgresConstants.TYPE,
      host: PostgresConstants.HOST,
      port: PostgresConstants.PORT,
      username: PostgresConstants.USERNAME,
      password: PostgresConstants.PASSWORD,
      database: PostgresConstants.DATABASE,
      entities: PostgresConstants.ENTITIES,
      synchronize: PostgresConstants.SYNCHRONIZE,
    }),
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
      sortSchema: true,
      playground: true,
      csrfPrevention: false,
      resolvers: { Date: DateResolver, DateTime: DateTimeResolver },
    }),
    UsersModule,
    AuthModule,
    CoursesModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
