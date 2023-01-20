import { Field, InputType } from "type-graphql";

@InputType()
export class GetPostInput {
  @Field()
  id: string;
}