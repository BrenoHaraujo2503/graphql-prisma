import 'reflect-metadata'
import { ApolloServer } from "apollo-server";
import path from "node:path"
import { buildSchema } from "type-graphql"
import { HelloResolver } from './resolvers/HelloResolver';

async function bootstrap() {
  const schema = await buildSchema({
    resolvers: [
      HelloResolver
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