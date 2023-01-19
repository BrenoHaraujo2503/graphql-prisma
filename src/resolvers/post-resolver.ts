import { Arg, Mutation, Query, Resolver } from "type-graphql";
import { CreatePostInput } from "../dtos/inputs/create-post-input";
import { Post } from "../dtos/models/post-model";
import { prisma } from "../libs/prisma";

@Resolver()
export class PostResolver {
  @Query(() => [Post])
  async posts() {
    return await prisma.post.findMany()
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
}