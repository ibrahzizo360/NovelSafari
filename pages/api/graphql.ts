'use-client';

import { startServerAndCreateNextHandler } from "@as-integrations/next";
import { ApolloServer } from "@apollo/server";
import { prisma } from "@/prisma/db";
import { typeDefs } from "@/graphql/schema";
import { resolvers } from "@/graphql/resolvers";
import { PrismaClient } from "@prisma/client";

export type Context = {
    prisma: PrismaClient
}

const apolloServer = new ApolloServer<Context>({
    typeDefs,
    resolvers,
})

export default startServerAndCreateNextHandler(apolloServer, {
    context: async (req, res) => ({req, res, prisma}),
});
