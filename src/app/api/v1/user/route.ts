import prisma from "@/lib/prisma/db";
import { NextRequest, NextResponse } from "next/server";

// 新規ユーザーの作成
// 旧：get_user(user_id)
const POST = async (req: NextRequest) => {
  try {
    const { id, username } = await req.json();
    const newUser = await prisma.user.create({
      data: {
        id,
        username,
      },
    });
    console.log(newUser);
    return NextResponse.json(newUser, { status: 201 });
  } catch (e) {
    console.log(e);
    return e;
  } finally {
    await prisma.$disconnect();
  }
};

// 指定されたuserIdのユーザーの情報の更新
// とりあえず後から変える可能性があるのはbio, Xのみという設定
// usernameも変更するように変更
// 旧：update_user(user_id)
const PUT = async (req: NextRequest) => {
  try {
    const { id, username, bio, X, photoUrl } = await req.json();
    const updatedUser = await prisma.user.update({
      where: {
        id,
      },
      data: {
        username,
        bio,
        X,
        photoUrl,
      },
    });
    console.log(updatedUser);
    return NextResponse.json(updatedUser, { status: 201 });
  } catch (e) {
    console.log(e);
    return e;
  } finally {
    await prisma.$disconnect();
  }
};

export { POST, PUT };
