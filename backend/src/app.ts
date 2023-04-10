import fastify from 'fastify';
import cors from '@fastify/cors';
import pokemon from './routes/pokemon';
import { multer } from './utils/multer';
import path from 'path';

const PORT = 8080;

export const server = fastify({
  logger: true,
});

server.register(require('@fastify/static'), {
  root: path.join(__dirname, 'public/pokemon/pictures'),
  prefix: '/public/pokemon/pictures',
});

server.register(multer.contentParser);

server.register(cors, {
  origin: '*',
  methods: ['GET', 'PUT', 'POST', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  preflightContinue: false,
  optionsSuccessStatus: 204,
});

server.register(pokemon);

server.listen({ port: PORT }, (err, address) => {
  if (err) {
    console.error(err);
    process.exit(1);
  }
  console.log(`Server listening at ${address}`);
});
