import { Post as userPost } from "@prisma/client";
import Post from "./post";

const PostList = ({ userPosts }: { userPosts: userPost[] }) => {

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
