import { Field, InputType } from "type-graphql";

@InputType()
export class CreatePostInput {
  @Field()
  title: string;

  @Field({ nullable: true })
  content?: string;

  @Field({ defaultValue: false })
  published: boolean;

  @Field()
  authorId: string;
}