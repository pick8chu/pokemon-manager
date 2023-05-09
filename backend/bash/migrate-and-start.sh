#!/bin/sh

npx prisma db push

npm run build

npm start
# npm run dev