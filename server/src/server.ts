// @ts-nocheck

import express from 'express';
import path from 'node:path';
import db from './config/connection.js';
import http from 'http';
// import routes from './routes/index.js';
import { ApolloServer } from '@apollo/server';
import { expressMiddleware } from '@apollo/server/express4';
import { typeDefs, resolvers } from "./schemas/index.js";
import { authenticateToken } from './services/auth.js';

const app = express();
const PORT = process.env.PORT || 3001;

// connection();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// app.use(routes);

const server = new ApolloServer({
  typeDefs,
  resolvers,
});


await server.start();

app.use(express.json());

// Set up our Express middleware to handle CORS, body parsing,
// and our expressMiddleware function.
app.use(
  '/graphql',
  // expressMiddleware accepts the same arguments:
  // an Apollo Server instance and optional configuration options
  expressMiddleware(server, {
    context: async ({ req }) => authenticateToken(req),
  }),
);

// if we're in production, serve client/build as static assets
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../client/build')));
}


// const httpServer = http.createServer(app)

// // Modified server startup
// await new Promise<void>((resolve) =>
//   httpServer.listen({ port: PORT }, resolve),
// );
// console.log(`🚀 Server ready at http://localhost:${PORT}/graphql`);

db.on('error', () => {
  console.log("error connecting")
});


app.listen(PORT, () => console.log(`🌍 Now listening on localhost:${PORT}/grpahql`));
