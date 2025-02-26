// @ts-nocheck

import express from 'express';
import path from 'node:path';
import connection from './config/connection.js';
import http from 'http';
// import routes from './routes/index.js';
import { ApolloServer } from '@apollo/server';
import { expressMiddleware } from '@apollo/server/express4';
import { typeDefs, resolvers } from "./schemas/index.js";
import { authenticateToken } from './services/auth.js';

const app = express();
const PORT = process.env.PORT || 3001;

connection();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// if we're in production, serve client/build as static assets
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../client/build')));
}

// app.use(routes);

const server = new ApolloServer({
  typeDefs,
  resolvers,
});


await server.start();

// Set up our Express middleware to handle CORS, body parsing,
// and our expressMiddleware function.
app.use(
  '/graphql',
  express.json(),
  // expressMiddleware accepts the same arguments:
  // an Apollo Server instance and optional configuration options
  expressMiddleware(server, {
    context: async ({ req }) => authenticateToken(req),
  }),
);

const httpServer = http.createServer(app)

// Modified server startup
await new Promise<void>((resolve) =>
  httpServer.listen({ port: PORT }, resolve),
);
console.log(`🚀 Server ready at http://localhost:${PORT}/graphql`);

// db.once('open', () => {
//   app.listen(PORT, () => console.log(`🌍 Now listening on localhost:${PORT}`));
// });
