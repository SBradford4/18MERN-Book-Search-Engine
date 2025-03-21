import express from 'express';
import path from 'node:path';
import { ApolloServer } from '@apollo/server';
import { expressMiddleware } from '@apollo/server/express4';
import { typeDefs, resolvers } from "./schemas/index.js";
import { authenticateToken } from './services/auth.js';
import { fileURLToPath } from 'url'; 
import { dirname } from 'path'; 
const __filename = fileURLToPath(import.meta.url); 
const __dirname = dirname(__filename);
import db from './config/connection.js';
const PORT = process.env.PORT || 3001;


const server = new ApolloServer({
  typeDefs,
  resolvers,
});

const app = express();

const startApolloServer = async ()=> { 
  
  await server.start();
  await db;
  
  app.use(express.urlencoded({ extended: true }));
  app.use(express.json());
  
  // Set up our Express middleware to handle CORS, body parsing,
  // and our expressMiddleware function.
  app.use(
    '/graphql',
    // expressMiddleware accepts the same arguments:
    // an Apollo Server instance and optional configuration options
    expressMiddleware(server as any, {
      context:  authenticateToken as any
    }),
  );
  
  // if we're in production, serve client/build as static assets
  if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname, '../../client/dist')));
  }
  db.on('error', () => {
    console.log("error connecting")
  });
  
  
  app.listen(PORT, () => console.log(`🌍 Now listening on http://localhost:${PORT}/grpahql`));

}

startApolloServer ();


