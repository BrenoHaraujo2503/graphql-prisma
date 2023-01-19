import { Field, ObjectType } from "type-graphql"

@ObjectType()
export class Post {
  @Field()
  id: string

  @Field()
  title: string

  @Field()
  content?: string

  @Field({ defaultValue: false })
  published: boolean;
}