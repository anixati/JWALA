// import * as express from 'express';
// import { ApolloServer } from 'apollo-server-express';

// import { singleton } from 'tsyringe';
// import { schema } from '../gql/schemas';
// import { resolverFunctions } from '../gql/resolvers';

// @singleton()
// export class GqlService {
//     private app: express.Application;
//     constructor() {
//         let exp = express();
//         this.app = exp;
//     }
//     public Create(): express.Application {
//         const apolloServer = new ApolloServer({
//              typeDefs: schema,
//              resolvers: resolverFunctions,
//             // Enable graphiql gui
//             introspection: true,
//             playground: true
//         });
//         apolloServer.applyMiddleware({ app: this.app, path: '/', cors: true });
//         return this.app;
//     }
// }
