import 'reflect-metadata'
import { ApolloServer } from "apollo-server";
import path from "node:path"
import { buildSchema } from "type-graphql"
import { UserResolver } from './resolvers/user-resolver';
import { PostResolver } from './resolvers/post-resolver';

async function bootstrap() {
  const schema = await buildSchema({
    validate: false,
    resolvers: [
      UserResolver,
      PostResolver
    ],
    emitSchemaFile: path.resolve(__dirname, 'schema.gql')
  });

  const server = new ApolloServer({
    schema
  });

  const { url } = await server.listen();

  console.log(`🚀  Server ready at: ${url}`)
}
bootstrap()