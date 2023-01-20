import { Field, InputType } from "type-graphql";

@InputType()
export class GetUserInput {
  @Field()
  id: string;
}