import prisma from "@/lib/prisma/db"

export const getUserPosts = async (userId: string) => {

    const userPosts = await prisma.post.findMany({
        where: {
            userId
        },
        orderBy: {
            postId: "desc"
        }
    })

    return userPosts
}

export const getUserPost = async (userId: string, postId: number) => {

    const userPost = await prisma.post.findUnique({
        where: {
            userId,
            postId
        },
        include: {
            user : true
        }
    })

    return userPost
}