import { FastifyRequest } from 'fastify';

export interface Pokemon {
  id?: string;
  name: string;
  height: number;
  weight: number;
  image?: string;
  updatedAt?: Date;
}

export interface ImageFile {
  fieldname: string;
  originalname: string;
  encoding: string;
  mimetype: string;
  destination: string;
  filename: string;
  path: string;
  size: number;
}

export interface FileReq extends FastifyRequest {
  file: ImageFile;
}
