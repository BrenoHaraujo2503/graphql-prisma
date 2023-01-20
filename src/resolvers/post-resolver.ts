import { Arg, FieldResolver, Mutation, Query, Resolver, Root } from "type-graphql";
import { CreatePostInput } from "../dtos/inputs/posts/create-post-input";
import { GetPostInput } from "../dtos/inputs/posts/get-user-input";
import { Post } from "../dtos/models/post-model";
import { User } from "../dtos/models/user-model";
import { prisma } from "../libs/prisma";

@Resolver(() => Post)
export class PostResolver {
  @Query(() => [Post])
  async posts() {
    return await prisma.post.findMany()
  }

  @Query(() => Post)
  async findPostInfoById(
    @Arg('data') data: GetPostInput
  ) {
    return await prisma.post.findUnique({
      where: {
        id: data.id
      }
    })
  }

  @Mutation(() => Post)
  async createPost(
    @Arg('data') data: CreatePostInput
  ) {
    const post = await prisma.post.create({
      data: {
        title: data.title,
        content: data.content,
        published: data.published,
        authorId: data.authorId
      }
    })

    return post;
  }

  @FieldResolver(() => User)
  async author(@Root() post: Post) {
    return await prisma.user.findUnique({
      where: {
        id: post.authorId
      }
    })
  }
}