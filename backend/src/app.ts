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
server.register(cors, { origin: 'localhost:3000' });
server.register(pokemon);

server.get('/', async (request, reply) => {
  return { hello: 'world' };
});

server.listen(
  {
    port: PORT,
    // by default host is localhost, so you have to explicitly set it to 0.0.0.0
    host: '0.0.0.0',
  },
  (err, address) => {
    if (err) {
      console.error(err);
      process.exit(1);
    }
    console.log(`Server listening at ${address}`);
  },
);
