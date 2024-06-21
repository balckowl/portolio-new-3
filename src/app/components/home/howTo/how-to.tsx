import { HowToListType } from "@/types/home"
import Card from "./card"

const HowToList: HowToListType[] = [
    { title: "はじめる", src: "/images/home/start.png", description: "まずはサイトにログインをしよう" },
    { title: "記事を書く", src: "/images/home/write.png", description: "挫折した作品についての記事を書こう" },
    { title: "投稿する", src: "/images/home/post.png", description: "書いた記事を皆に共有しよう" },
]

const HowTo = () => {
    return (
        <div className="pt-[140px] pb-[140px] bg-muted">
            <div className="container flex justify-center">
                <div className="w-full lg:w-[80%]">
                    <h3 className="text-center text-[30px] lg:text-[39px] font-[700] mb-[30px]">portolioの使い方</h3>
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-[20px]">
                        {HowToList.map((item) => (
                            <Card title={item.title} src={item.src} description={item.description} key={item.title}/>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default HowTo