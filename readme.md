
docker compose up

### PROBLEMS THAT I ENCOUNTERED 
1. Fastify host : by default fastify host is localhost. For docker you have to set 0.0.0.0
2. prisma : It has to wait until the database is ready - therefore you need to start `sh` file.