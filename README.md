# Todo app server

## Setup the server

### Environment variables

Add the following variables in '.env' file at root directory:

-DATABASE_URL="your postrges database url"

-PORT=3000 (or any port number)

-JWT_SECRET="your jwt secret"

### Start the server

1. install dependencies: `npm install`
2. migrate database: `npx prisma migrate dev --name init`
3. run dev server: `npm run dev`
