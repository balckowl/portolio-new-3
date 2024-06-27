import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CircleHelp, RefreshCw } from "lucide-react";
import Link from "next/link";

const Article = () => {
    return (
        <div className="py-[100px] flex justify-center bg-muted min-h-[calc(100vh-80px-60px)]">
            <Tabs className="w-[92%] sm:container flex justify-center" defaultValue="markdown">
                <div className="w-full lg:w-[60%]">
                    <div className="mb-[10px]">
                        <h2 className="text-[20px] sm:text-[25px] lg:text-[30px] font-bold">learning Next.js</h2>
                    </div>
                    <div className="min-h-[400px] bg-white p-5 rounded-[5px] mb-[10px]">
                        <div className="border-[1px] border-[#eee] rounded-[5px] flex justify-between p-3 mb-[15px]">
                            <div className="flex-col sm:flex-row flex sm:items-center sm:gap-3">
                                <div className="text-[13px]">2024/6/24</div>
                                <div className="flex items-center gap-1 text-[13px]">
                                    <RefreshCw width={18} height={18} />
                                    <div>2024/6/24</div>
                                </div>
                            </div>
                            <Link href={`/mypage`}>
                                <div className="flex items-center gap-3">
                                    <Avatar>
                                        <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
                                        <AvatarFallback>CN</AvatarFallback>
                                    </Avatar>
                                    <p className="hidden sm:block">rocket_peng</p>
                                </div>
                            </Link>
                        </div>

                        <div className="flex gap-2 justify-end mb-[15px]">
                            <Button>編集</Button>
                            <Button>削除</Button>
                        </div>

                        <div>
                            <div className="preview">
                                <div>Article Detail.....Article Detail.... Article Detail....</div>
                            </div>
                        </div>
                    </div>

                    <div className="flex justify-end items-center gap-3">
                        <Link href="/posts/2" target="_blank">
                            <div className="bg-white py-2 px-2 flex items-center gap-3 cursor-pointer rounded-[5px]">
                                <CircleHelp width={20} height={20} />
                            </div>
                        </Link>
                        <TabsList>
                            <TabsTrigger value="markdown" >Markdown</TabsTrigger>
                            <TabsTrigger value="password" >Preview</TabsTrigger>
                        </TabsList>
                    </div>
                </div>
            </Tabs>
        </div>
    )
}

export default Article