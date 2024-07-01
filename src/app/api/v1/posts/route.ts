import prisma from "@/lib/prisma/db";
import { NextRequest, NextResponse } from "next/server";

// 新規投稿の作成
// 旧：create_post(user_id)
const POST = async (req: NextRequest) => {
  try {
    const { userId, title, description, icon } = await req.json();
    const newUserPost = await prisma.post.create({
      data: {
        userId,
        title,
        description,
        icon,
      },
    });

    const newPostComment = await prisma.comment.create({
      data: {
        postId: newUserPost.postId,
        description: "",
      },
    });

    console.log(newUserPost, newPostComment);
    return NextResponse.json({ newUserPost, newPostComment }, { status: 201 });
  } catch (e) {
    console.log(e);
    return e;
  } finally {
    await prisma.$disconnect();
  }
};

export { POST };
