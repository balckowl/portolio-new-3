import Post from "./post";
import { postListType } from "@/types/mypage";

const postList : postListType[] = [
    {icon: "😃", title: "失敗しました。"},
    {icon: "😃", title: "失敗しました。"},
    {icon: "👶", title: "おぎゃ〜（号泣）"},
    {icon: "😃", title: "失敗しました。"},
    {icon: "⚠️", title: "失敗しました。"}
]

const PostList = () => {

    return (
        <div className="py-[90px] lg:py-[140px]">
            <div className="container flex justify-center">
                <div className="w-full lg:w-[80%]">
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">

                        {
                            postList.map(
                                item => (
                                <Post icon={item.icon} title={item.title} key={item.title}/>
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