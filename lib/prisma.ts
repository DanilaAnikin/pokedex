import {PrismaClient} from '@prisma/client'
import {createClient} from "@libsql/client";
import {PrismaLibSQL} from "@prisma/adapter-libsql";

const prismaClientSingleton = () => {
  const libsql = createClient({
    url: `${process.env.TURSO_DATABASE_URL}`,
    authToken: `${process.env.TURSO_AUTH_TOKEN}`,
  })

  const adapter = new PrismaLibSQL(libsql)
  return new PrismaClient({adapter})
}

declare const globalThis: {
  prismaGlobal: ReturnType<typeof prismaClientSingleton>;
} & typeof global;

const prisma = globalThis.prismaGlobal ?? prismaClientSingleton()

export default prisma

if (process.env.NODE_ENV !== 'production') globalThis.prismaGlobal = prisma
