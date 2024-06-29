import prisma from "@/lib/prisma/db";
import { NextRequest, NextResponse } from "next/server";

// 指定されたpostIdの投稿の更新
// 旧：update_post(post_id)
const PUT = async (req: NextRequest, { params }: { params: { id: string }}) => {
    try {
      const { id: postId } = params
      const { title, description, icon } = await req.json();
      const updatedUserPost = await prisma.post.update({
        where: {
          postId: Number(postId),
        },
        data: {
          title,
          description,
          icon,
        },
      });
      console.log(updatedUserPost);
      return NextResponse.json(updatedUserPost, { status: 201 });
    } catch (e) {
      console.log(e);
      return e;
    } finally {
      await prisma.$disconnect();
    }
  };
  
  // DELETE
  // 指定されたpostIdの投稿の削除
  // 旧：delete_post(post_id)
  // 指定されたpostIdに紐づけられたコメントがあれば削除
  // ↑CommentIdに基づいてコメントを消す関数を別に用意したほうが良い？
  const DELETE = async (req: NextRequest, { params }: { params: { id: string }}) => {
    try {
      const { id: postId } = params;
      const deletedUserPost = await prisma.post.delete({
        where: {
          postId: Number(postId),
        },
      });
      console.log(postId);
      return NextResponse.json(deletedUserPost, { status: 201 });
    } catch (e) {
      console.log(e);
      return e;
    } 
  };
  
  export { PUT, DELETE };
  