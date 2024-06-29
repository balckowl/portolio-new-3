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
    console.log(newUserPost);
    return NextResponse.json(newUserPost, { status: 201 });
  } catch (e) {
    console.log(e);
    return e;
  } finally {
    await prisma.$disconnect();
  }
};

export { POST };
