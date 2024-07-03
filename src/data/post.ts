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

export const getPost = async (postId: number) => {

    const userPost = await prisma.post.findUnique({
        where: {
            postId
        },
        include: {
            user : true,
            comment : true
        }
    })

    return userPost
}
