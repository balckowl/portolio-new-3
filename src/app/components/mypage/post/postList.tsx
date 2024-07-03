import { Post as userPost } from "@prisma/client";
import Post from "./post";
import Image from "next/image";

const PostList = ({ userPosts }: { userPosts: userPost[] }) => {
    if (userPosts.length == 0) {
        return (
            <div className="h-[500px] bg-zinc-200 dark:bg-zinc-700 flex justify-center items-center text-[30px]">
                <div>
                    <Image src="/images/editor/face2.png" width="100" height="100" alt="face" className="mx-auto mb-3"/>
                    <p>未だ何も投稿されていません</p>
                </div>
            </div>
        )

    }

    return (
        <div className="bg-zinc-200 dark:bg-zinc-700 py-[180px]">
            <div className="container flex justify-center">
                <div className="w-full lg:w-[80%]">
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">

                        {
                            userPosts.map(
                                item => (
                                    <Post icon={item.icon} title={item.title} postId={item.postId} key={item.title} />
                                )
                            )
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}

export default PostList
