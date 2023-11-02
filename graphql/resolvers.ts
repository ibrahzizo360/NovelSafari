import { Context } from '@/pages/api/graphql'

export const resolvers = {
    Query: {
        novel: async (_parent: any, args: any, context: Context) => {
            const { id } = args
            const { prisma } = context
            const novel = await prisma.novel.findUnique({
                where: {
                    id: id,
                },
            })
            return novel
        },
        novels: async (_parent: any, _args: any, context: Context) => {
            const { prisma } = context
            const novels = await prisma.novel.findMany({
                include: {
                    author: true,
                },
            })
            return novels
        },
    },
    Novel: {
        authors: async (_parent: any, _args: any, context: Context) => {
            const { prisma } = context
            const authors = await prisma.author
                .findMany({
                    where: {
                        novelId: _parent.id,
                    },
                })
            return authors
        }
    },
    Mutation: {
        addNovel: async (_parent: any, args: any, context: Context) => {
            const { prisma } = context
            const { title, image } = args
            const novel = await prisma.novel.create({
                data: {
                    title: title,
                    image: image,
                }
        })
        },

        updateNovel: async (_parent: any, args: any, context: Context) => {
            const { prisma } = context
            const { id, title, image } = args
            const novel = await prisma.novel.update({
                where: {
                    id: id,
                },
                data: {
                    title: title,
                    image: image,
                }
            })
            return novel
        },

        deleteNovel: async (_parent: any, args: any, context: Context) => {
            const { prisma } = context
            const { id } = args
            const novel = await prisma.novel.delete({
                where: {
                    id: id,
                },
            })
            return novel
        },

        addAuthor: async (_parent: any, args: any, context: Context) => {
            const { prisma } = context
            const { name, novelId } = args
            const author = await prisma.author.create({
                data: {
                    name: name,
                    novelId: novelId,
                }
            })
            return author
        },

        deleteAuthor: async (_parent: any, args: any, context: Context) => {
            const { prisma } = context
            const { id } = args
            const author = await prisma.author.delete({
                where: {
                    id: id,
                },
            })
            return author
        },    
    }
} 