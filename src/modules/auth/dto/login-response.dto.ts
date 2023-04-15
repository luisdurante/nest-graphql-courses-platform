import { ObjectType, Field } from '@nestjs/graphql';
import { UserDTO } from 'src/modules/users/dto/user.dto';

@ObjectType()
export class LoginResponse {
  @Field(() => UserDTO, { description: 'User information' })
  user: UserDTO;

  @Field(() => String, { description: 'User access token' })
  access_token: string;
}
