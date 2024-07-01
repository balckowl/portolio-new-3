import prisma from "@/lib/prisma/db";
import { NextRequest, NextResponse } from "next/server";

// 新規コメントの作成
const POST = async (req: NextRequest) => {
    try {
      const { postId, description } = await req.json();
      const newPostComment = await prisma.comment.create({
        data: {
          postId,
          description,
        },
      });
      console.log(newPostComment);
      return NextResponse.json(newPostComment, { status: 201 });
    } catch (e) {
      console.log(e);
      return e;
    } finally {
      await prisma.$disconnect();
    }
  };

// 指定されたcommentId(PostId?)のコメントの更新
const PUT = async (req: NextRequest) => {
    try {
      const { postId, description } = await req.json();
      const updatedPostComment = await prisma.comment.update({
        where: {
          postId,
        },
        data: {
          description,
        },
      });
      console.log(updatedPostComment);
      return NextResponse.json(updatedPostComment, { status: 201 });
    } catch (e) {
      console.log(e);
      return e;
    } finally {
      await prisma.$disconnect();
    }
  };

export {POST, PUT}
