import { InputType, Int, Field } from '@nestjs/graphql';
import { DateResolver } from 'graphql-scalars';

@InputType()
export class CreateUserInput {
  @Field(() => String, { description: 'User email' })
  email: string;

  @Field(() => String, { description: 'User name' })
  name: string;

  @Field(() => String, { description: 'User password' })
  password: string;

  @Field(() => DateResolver, { description: 'User birth date' })
  birthDate: Date;
}
