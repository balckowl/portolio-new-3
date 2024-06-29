import Link from "next/link";

const Post = ({ icon, title, postId }: { icon: string, title: string, postId: number }) => {
    return (
        <div className="col-span-1 border-[1px] rounded-[5px] bg-muted" >
            <Link href={`/posts/${postId}`}>
                <div className="text-center py-5">
                    <span className="text-[50px]">{icon}</span>
                </div>
                <div className={`bg-white dark:bg-zinc-700 py-5 px-5 h-[100px]`}>
                    <h2 className={`text-[18px] font-bold`}>{title}</h2>
                </div>
            </Link>
        </div>
    )
}

export default Post