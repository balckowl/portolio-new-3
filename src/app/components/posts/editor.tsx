"use client"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { CircleHelp, Image } from "lucide-react"
import Link from "next/link"

const Editor = () => {
    return (
        <div className="py-[100px] flex justify-center min-h-[calc(100vh-80px-60px)]">
            <div className="w-[92%] sm:container flex justify-center">
                <Tabs className="w-full lg:w-[60%]" defaultValue="markdown">
                    <div className="mb-[5px]">
                        <input type="text" placeholder="ここにタイトルを入力してください。" className="w-full bg-[#eee] focus:outline-none text-[18px] md:text-[25px] lg:text-[30px]"/>
                    </div>
                    <div className="mb-[10px]">
                        <TabsContent value="markdown">
                            <div className="h-[400px] bg-white p-5 rounded-[5px] relative w-full">
                                <textarea name="" className="h-full w-full focus:outline-none resize-none"></textarea>
                                <div onClick={() => document.getElementById('file-input')?.click()} className="bg-yellow-200 w-12 h-12 flex items-center justify-center absolute bottom-[10px] right-[10px] rounded-full cursor-pointer">
                                    <Image />
                                    <input type="file" id="file-input" className="hidden" accept=".jpg,.gif,.png,image/gif,image/jpeg,image/png" />
                                </div>
                            </div>
                        </TabsContent>
                        <TabsContent value="password">
                            <div className={`preview min-h-[400px] bg-white px-8 py-5 rounded-[5px] w-full`}>
                                挫折しました！！！挫折しました！！！挫折しました！！！
                            </div>
                        </TabsContent>
                    </div>
                    <div className="flex justify-end items-center gap-3">
                        <Link href="/posts/2" target="_blank">
                            <div className="bg-white py-2 px-2 flex items-center gap-3 cursor-pointer rounded-[10px]">
                                <CircleHelp width={20} height={20} />
                            </div>
                        </Link>
                        <TabsList>
                            <TabsTrigger value="markdown">Markdown</TabsTrigger>
                            <TabsTrigger value="password">Preview</TabsTrigger>
                        </TabsList>
                    </div>
                </Tabs>
            </div>
        </div>
    )
}

export default Editor;