import { getComment } from "@/data/comment";
import Link from "next/link";

const Post = async ({ icon, title, postId }: { icon: string, title: string, postId: number }) => {

    const comment = await getComment(postId);

    return (
        <div className="relative col-span-1 border-[1px] rounded-[5px] bg-muted">
            <Link href={`/posts/${postId}`}>
                <div className="text-center py-5">
                    <span className="text-[50px]">{icon}</span>
                </div>
                <div className={`bg-white dark:bg-zinc-700 py-5 px-5 h-[100px] rounded-b-md`}>
                    <h2 className={`text-[18px] font-bold`}>{title}</h2>
                </div>
            </Link>
            <div className={`absolute bottom-0 right-0 w-0 h-0 border-l-[50px] border-l-transparent border-b-[50px] ${comment?.description ? "border-b-green-300": "border-b-red-300"} rounded-br-md`}></div>
        </div>
    );
}

export default Post;
