import { Resolver, Query, Mutation, Arg, FieldResolver, Root } from 'type-graphql'
import { CreateUserInput } from '../dtos/inputs/users/create-user-input';
import { GetUserInput } from '../dtos/inputs/users/get-user-input';
import { Post } from '../dtos/models/post-model';
import { User } from '../dtos/models/user-model';
import { prisma } from '../libs/prisma';

@Resolver(() => User)
export class UserResolver {
  @Query(() => User)
  async findById(@Arg('data') data: GetUserInput) {
    return prisma.user.findUnique({
      where: {
        id: data.id
      }
    })
  }

  @Query(() => [User])
  async users() {
    return await prisma.user.findMany()
  }
  @Mutation(() => User)
  async createUser(
    @Arg('data') data: CreateUserInput
  ) {
    const user = await prisma.user.create({
      data: {
        email: data.email,
        name: data.name
      }
    })

    return user;
  }

  @FieldResolver(() => [Post])
  async posts(
    @Root() user: User
  ) {
    return await prisma.post.findMany({
      where: {
        authorId: user.id
      }
    })
  }
}