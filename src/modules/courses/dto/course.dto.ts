import { ObjectType, Field } from '@nestjs/graphql';
import { DateTimeResolver } from 'graphql-scalars';
import { User } from '../../users/entities/user.entity';
import { UserDTO } from '../../users/dto/user.dto';

@ObjectType('Course')
export class CourseDTO {
  @Field(() => String, { description: 'Course ID (uuid)' })
  id: string;

  @Field(() => String, { description: 'Course title' })
  title: string;

  @Field(() => String, { description: 'Course description', nullable: true })
  description?: string;

  @Field(() => DateTimeResolver, { description: 'Course creation date' })
  createdAt: Date;

  @Field(() => DateTimeResolver, {
    description: 'Course last update date',
    nullable: true,
  })
  updatedAt: Date;

  @Field(() => DateTimeResolver, {
    description: 'Course deletion date',
    nullable: true,
  })
  deletedAt: Date;

  @Field(() => UserDTO, { description: 'Course owner ID (uuid)' })
  owner: User;
}
