import { server } from 'app';
import { FILE_TYPE_NOT_SUPPORTED } from '../statics/ErrorCode';

server.setErrorHandler(function (error, request, reply) {
  // message has to be statically defined.
  if (error.message === FILE_TYPE_NOT_SUPPORTED) {
    reply.code(422).send({
      message: 'File type not supported',
    });
  }
});
