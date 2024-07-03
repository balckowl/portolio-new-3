import { firebaseAdmin } from "@/lib/firebase/admin";
import prisma from "@/lib/prisma/db";
import { NextRequest, NextResponse } from "next/server";

// 新規ユーザーの作成
// 旧：get_user(user_id)
const POST = async (req: NextRequest) => {
  try {
    const { idToken } = await req.json()
    const decodedToken = await firebaseAdmin.auth().verifyIdToken(idToken)
    console.log(decodedToken.firebase.identities)
    const { uid: id, name: username, picture: photoUrl } = decodedToken;

    const newUser = await prisma.user.create({
      data: {
        id,
        username,
        photoUrl,
      },
    });
    console.log(newUser);
    return NextResponse.json(newUser, { status: 201 });
  } catch (e) {
    return NextResponse.json({ status: 500 });
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
    return NextResponse.json({ status: 500 });
  }
};

export { POST, PUT };
