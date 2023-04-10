import { FastifyInstance, FastifyReply, FastifyRequest } from 'fastify';

import { PrismaClient } from '@prisma/client';
import { upload } from '../utils/multer';
import { FileReq, Pokemon } from '../statics/Interfaces';

const prisma = new PrismaClient();

async function uploadImage(filename, mime_type, size) {
  const image = await prisma.image.create({
    data: {
      filename,
      mime_type,
      size,
    },
  });
  return image;
}

async function pokemon(fastify: FastifyInstance) {
  fastify.post('/pokemon/upload', { preHandler: upload.single('photo') }, async (request: FastifyRequest, reply: FastifyReply) => {
    try {
      const { file } = request as FileReq;
      const { filename, mimetype, size } = file;
      await uploadImage(filename, mimetype, size);

      reply.code(200).send({
        message: 'File uploaded!',
        filename,
      });
    } catch (e) {
      console.log(e);
      reply.code(400).send({
        message: 'File not uploaded',
      });
    }
  });

  fastify.get(
    '/pokemon/count',
    async (
      request: FastifyRequest<{
        Querystring: {
          name?: string;
        };
      }>,
      reply: FastifyReply,
    ) => {
      try {
        const name = request.query.name;
        const pokemon = await prisma.pokemon.count({
          where: {
            name: {
              contains: name,
            },
          },
        });
        reply.code(200).send({
          count: pokemon,
        });
      } catch (e) {
        console.log(e);
        reply.code(400).send({
          message: 'ERROR counting pokemon',
        });
      }
    },
  );

  fastify.get(
    '/pokemon',
    async (
      request: FastifyRequest<{
        Querystring: {
          name?: string;
          page: string;
          limit: string;
        };
      }>,
      reply: FastifyReply,
    ) => {
      try {
        const name = request.query.name;
        const page: number = parseInt(request.query.page as string);
        const limit: number = parseInt(request.query.limit as string);
        const pokemons = await prisma.pokemon.findMany({
          where: {
            name: {
              contains: name,
            },
          },
          skip: (page - 1) * limit,
          take: limit,
          orderBy: {
            name: 'asc',
          },
        });
        reply.code(200).send(
          pokemons.map(pokemon => ({
            ...pokemon,
            updateDtm: pokemon.updatedAt.toISOString(),
          })),
        );
      } catch (e) {
        console.log(e);
        reply.code(400).send({
          message: 'Pokemon can not be found',
        });
      }
    },
  );

  fastify.post(
    '/pokemon',
    async (
      request: FastifyRequest<{
        Body: Pokemon;
      }>,
      reply: FastifyReply,
    ) => {
      const { name, height, weight, image } = request.body;
      try {
        await prisma.pokemon.create({
          data: {
            name,
            height,
            weight,
            image,
          },
        });
        reply.code(200).send({
          message: 'Pokemon created',
        });
      } catch (e) {
        console.log(e);
        reply.code(400).send({
          message: 'Pokemon not created',
        });
      }
    },
  );

  fastify.put(
    '/pokemon',
    async (
      request: FastifyRequest<{
        Body: Pokemon;
      }>,
      reply: FastifyReply,
    ) => {
      const { id, name, height, weight } = request.body;
      try {
        await prisma.pokemon.update({
          where: {
            id,
          },
          data: {
            name,
            height,
            weight,
            image: '',
          },
        });
        reply.code(200).send({
          message: 'Pokemon updated',
        });
      } catch (e) {
        console.log(e);
        reply.code(400).send({
          message: 'Pokemon not updated',
        });
      }
    },
  );

  fastify.delete(
    '/pokemon/:id',
    async (
      request: FastifyRequest<{
        Params: {
          id: string;
        };
      }>,
      reply: FastifyReply,
    ) => {
      const { id } = request.params;
      try {
        await prisma.pokemon.delete({
          where: {
            id,
          },
        });
        reply.code(200).send({
          message: 'Pokemon deleted',
        });
      } catch (e) {
        console.log(e);
        reply.code(400).send({
          message: 'Pokemon not deleted',
        });
      }
    },
  );
}

export default pokemon;
