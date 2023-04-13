import { ObjectType, Field } from '@nestjs/graphql';
import { DateResolver, DateTimeResolver } from 'graphql-scalars';

@ObjectType('User')
export class UserDTO {
  @Field(() => String, { description: 'User ID (uuid)' })
  id: string;

  @Field(() => String, { description: 'User email' })
  email: string;

  @Field(() => String, { description: 'User name' })
  name: string;

  @Field(() => String, { description: 'User description' })
  description: string;

  @Field(() => DateResolver, { description: 'User birth date' })
  birthDate: Date;

  @Field(() => DateTimeResolver, { description: 'User creation date' })
  createdAt: Date;

  @Field(() => DateTimeResolver, { description: 'User last update date' })
  updatedAt: Date;

  @Field(() => DateTimeResolver, { description: 'User deletion date' })
  deletedAt: Date;
}
