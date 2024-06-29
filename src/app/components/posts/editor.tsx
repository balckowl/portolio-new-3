"use client"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { CircleHelp, Image } from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useState } from "react"
import { toast, Toaster } from "react-hot-toast";
import Picker from '@emoji-mart/react';

const Editor = () => {
    const [title, setTitle] = useState<string>("");
    const [description, setDescription] = useState<string>("");
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [icon, setIcon] = useState<string>("🍙");

    const router = useRouter();

    const handleSubmit = async () => {

        if (!title || !description || !icon) {
            alert("入力値が不足しています");
            return;
        }

        setIsLoading(true);

        const loading = toast.loading("送信中...");

        try {
            await fetch(`http://localhost:3000/api/v1/posts`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    userId: "rocket_peng",
                    title: title,
                    description: description,
                    icon: icon
                })
            });

            setIsLoading(false);

            setTitle("");
            setDescription("");

            toast.dismiss(loading);
            toast.success("送信できました");
            router.push("/mypage");
            router.refresh();

        } catch (e) {
            setIsLoading(false);
            toast.dismiss(loading);
            toast.error("送信に失敗しました")
        }
    }

    return (
        <div className="py-[100px] flex justify-center min-h-[calc(100vh-80px-60px)]">

            <Toaster />

            <div className="flex gap-2">


                <Popover>
                    <PopoverTrigger asChild>
                        <Button>公開設定</Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-full">
                        <p>アイコンを選んで、その作品の失敗度を相手に伝えよう。</p>
                        {icon}
                        <Picker onEmojiSelect={(emoji: any) => {setIcon(emoji.native);}}/>
                    </PopoverContent>
                </Popover>

                <Button onClick={handleSubmit} disabled={isLoading}>公開</Button>
            </div>

            <div className="w-[92%] sm:container flex justify-center">
                <Tabs className="w-full lg:w-[60%]" defaultValue="markdown">
                    <div className="mb-[5px]">
                        <input type="text" placeholder="ここにタイトルを入力してください。" className="w-full bg-muted focus:outline-none text-[18px] md:text-[25px] lg:text-[30px]" value={title} onChange={(e) => { setTitle(e.target.value) }} />
                    </div>
                    <div className="mb-[10px]">
                        <TabsContent value="markdown">
                            <div className="h-[400px] bg-white dark:bg-zinc-700 p-5 rounded-[5px] relative w-full">
                                <textarea name="" className="h-full w-full focus:outline-none resize-none bg-white dark:bg-zinc-700" value={description} onChange={(e) => { setDescription(e.target.value) }}></textarea>
                                <div onClick={() => document.getElementById('file-input')?.click()} className="bg-yellow-200 dark:text-zinc-700 w-12 h-12 flex items-center justify-center absolute bottom-[10px] right-[10px] rounded-full cursor-pointer">
                                    <Image />
                                    <input type="file" id="file-input" className="hidden" accept=".jpg,.gif,.png,image/gif,image/jpeg,image/png" />
                                </div>
                            </div>
                        </TabsContent>
                        <TabsContent value="password">
                            <div className={`preview min-h-[400px] bg-white dark:bg-zinc-700 px-8 py-5 rounded-[5px] w-full`}>
                                {description}
                            </div>
                        </TabsContent>
                    </div>
                    <div className="flex justify-end items-center gap-3">
                        <Link href="/posts/2" target="_blank">
                            <div className="bg-muted py-2 px-2 flex items-center gap-3 cursor-pointer rounded-[10px]">
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