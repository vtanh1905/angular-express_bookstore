import dotenv from 'dotenv';
interface EnviromentVariable {
  // Docker MongoDB 
  MONGO_INITDB_ROOT_USERNAME: string,
  MONGO_INITDB_ROOT_PASSWORD: string,
  MONGO_INITDB_DATABASE: string,
  MONGO_INITDB_HOSTNAME: string,
  MONGO_INITDB_PORT: number,

  // Security
  JWT_TOKEN_SECRET: string,

  // S3 Service
  BUCKET_NAME:string,
  ACCESS_KEY_ID:string,
  SECRET_ACCESS_KEY:string,

  // Server
  NODE_ENV: string,
  PORT: number
}

export const env : EnviromentVariable = dotenv.config().parsed as unknown as EnviromentVariable;