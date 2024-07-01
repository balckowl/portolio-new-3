import prisma from "@/lib/prisma/db"

export const getComment = async(postId: number) => {
    const comment = await prisma.comment.findUnique({
        where:{
            postId
        }
    })

    return comment
}
