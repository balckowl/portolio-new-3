"use server";
import prisma from "@/lib/prisma/db";
import "server-only";

// POST
// 新規ユーザーの作成
// 旧：get_user(user_id)
export const createUser = async (data: FormData) => {
  try {
    const id = data.get("id") as string;
    const username = data.get("username") as string;
    // if(!id || !username) {
    //   return
    // }
    const newUser = await prisma.user.create({
      data: {
        id,
        username,
      },
    });
    console.log(newUser);
    return newUser;
  } catch (e) {
    console.log(e);
    return e;
  }
};

// 新規投稿の作成
// 旧：create_post(user_id)
export const createUserPost = async (data: FormData) => {
  try {
    const userId = data.get("userId") as string;
    const title = data.get("title") as string;
    const description = data.get("description") as string;
    const icon = data.get("icon") as string;
    const newUserPost = await prisma.post.create({
      data: {
        userId,
        title,
        description,
        icon,
      },
    });
    console.log(newUserPost);
    return newUserPost;
  } catch (e) {
    console.log(e);
    return e;
  }
};

// // 新規コメントの作成
// export const createPostComment = async (data: FormData) => {
//   try {
//     const postId = data.get("postId") as string;
//     const description = data.get("description") as string;
//     const newPostComment = await prisma.comment.create({
//       data: {
//         postId: Number(postId),
//         description,
//       },
//     });
//     console.log(newPostComment);
//     return newPostComment;
//   } catch (e) {
//     console.log(e);
//     return e;
//   }
// };

// PUT
// 指定されたuserIdのユーザーの情報の更新
// とりあえず後から変える可能性があるのはbio, Xのみという設定
// usernameも変更するように変更
// 旧：update_user(user_id)
export const updateUser = async (data: FormData) => {
  try {
    const id = data.get("id") as string;
    const username = data.get("username") as string;
    const bio = data.get("bio") as string;
    const X = data.get("X") as string;
    const photoUrl = data.get("photoUrl") as string;
    const updatedUser = await prisma.user.update({
      where: {
        id
      },
      data: {
        username,
        bio,
        X,
        photoUrl
      }
    });
    console.log(updatedUser);
    return updatedUser;
  } catch (e) {
    console.log(e);
    return e;
  }
};

// 指定されたpostIdの投稿の更新
// 旧：update_post(post_id)
export const updateUserPost = async (data: FormData) => {
  try {
    const postId = data.get("postId") as string;
    const title = data.get("title") as string;
    const description = data.get("description") as string;
    const icon = data.get("icon") as string;
    const updatedUserPost = await prisma.post.update(
      {
        where: {
          postId: Number(postId)
        },
        data: {
          title,
          description,
          icon
        }
      }
    );
    console.log(updatedUserPost);
    return updatedUserPost;
  } catch (e) {
    console.log(e);
    return e;
  }
};

// // 指定されたcommentId(PostId?)のコメントの更新
// export const updatePostComment = async (data: FormData) => {
//   try {
//     const updatedPostComment = await prisma.comment;
//     console.log(updatedPostComment);
//     return updatedPostComment;
//   } catch (e) {
//     console.log(e);
//     return e;
//   }
// };

// DELETE
// 指定されたpostIdの投稿の削除
// 旧：delete_post(post_id)
// 指定されたpostIdに紐づけられたコメントがあれば削除
// ↑CommentIdに基づいてコメントを消す関数を別に用意したほうが良い？
export const deleteUserPost = async (data: FormData) => {
  try {
    const postId = data.get("postId") as string;
    const deletedUserPost = await prisma.post.delete({
      where: {
        postId: Number(postId),
      },
    });
    console.log(deletedUserPost);
    return deletedUserPost;
  } catch (e) {
    console.log(e);
    return e;
  }
};
