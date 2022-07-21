import dotenv from 'dotenv';
interface EnviromentVariable {
  // Docker MongoDB 
  MONGO_INITDB_ROOT_USERNAME: string,
  MONGO_INITDB_ROOT_PASSWORD: string,
  MONGO_INITDB_DATABASE: string,

  // Server
  NODE_ENV: string,
  PORT: number
}

export const env : EnviromentVariable = dotenv.config().parsed as unknown as EnviromentVariable;