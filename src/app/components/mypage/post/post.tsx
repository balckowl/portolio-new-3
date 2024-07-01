import { getComment } from "@/data/comment";
import Image from "next/image";
import Link from "next/link";

const Post = async ({ icon, title, postId }: { icon: string, title: string, postId: number }) => {

    const comment = await getComment(postId);

    return (
        <div className="relative col-span-1 border-[1px] rounded-[5px]">
            <Link href={`/posts/${postId}`}>
                <div className="flex justify-center py-5 bg-muted">
                    <Image src={`/images/editor/face${icon}.png`} alt="" width="80" height="80" />
                </div>
                <div className={`bg-white dark:bg-zinc-600 py-5 px-5 h-[100px] rounded-b-md`}>
                    <h2 className={`text-[18px] font-bold`}>{title}</h2>
                </div>
            </Link>
            <div className={`absolute bottom-0 right-0 w-0 h-0 border-l-[50px] border-l-transparent border-b-[50px] ${comment?.description ? "border-b-green-300 dark:border-b-green-600" : "border-b-red-300 dark:border-b-red-500"} rounded-br-md`}></div>
        </div>
    );
}

export default Post;
