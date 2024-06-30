"use client"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CircleHelp, RefreshCw } from "lucide-react";
import Link from "next/link";
import { format } from "date-fns";
import { Post, User } from "@prisma/client";
import { useRouter } from "next/navigation";
import toast, { Toaster } from "react-hot-toast";
import { useState } from "react";
import { CodeBlock } from "./codeBlock";
import ReactMarkdown from 'react-markdown'
import "./css/editer.css"

const Article = ({ title, description, icon, createdAt, updatedAt, id, username, photoUrl, postId }: Post & { id: string, username: string, photoUrl: string | null, postId: number }) => {

    const createdAtFormatted = format(createdAt, "yyyy/MM/dd");
    const updatedAtFormatted = format(updatedAt, "yyyy/MM/dd");

    const router = useRouter();

    const [isLoading, setIsLoading] = useState<boolean>(false);

    const deletePost = async () => {
        try {
            setIsLoading(true);

            await fetch(`http://localhost:3000/api/v1/posts/${postId}`, {
                method: "DELETE",
            })

            setIsLoading(false);

            router.push("/mypage");
            router.refresh();
        } catch (e) {
            setIsLoading(false);
            toast.error("削除に失敗しました")
        }
    }

    return (
        <div className="py-[70px] flex items-center justify-center bg-muted min-h-[calc(100vh-80px-80px)]">
            <Toaster />
            <Tabs className="w-[92%] sm:container flex justify-center" defaultValue="markdown">
                <div className="w-full lg:w-[60%]">

                    <div className="mb-[10px] flex items-center gap-3">
                        <div className="text-[30px] lg:text-[40px]">{icon}</div>
                        <h2 className="text-[20px] sm:text-[25px] lg:text-[30px] font-bold">{title}</h2>
                    </div>

                    <div className="min-h-[400px] bg-white dark:bg-zinc-700 p-5 rounded-[5px] mb-[10px]">
                        <div className="border-[1px] border-[#eee] rounded-[5px] flex justify-between p-3 mb-[15px]">
                            <div className="flex-col sm:flex-row flex sm:items-center sm:gap-3">
                                <div className="text-[13px]">{createdAtFormatted} </div>
                                <div className="flex items-center gap-1 text-[13px]">
                                    <RefreshCw width={18} height={18} />
                                    <div>{updatedAtFormatted}</div>
                                </div>
                            </div>
                            <Link href={`/mypage`}>
                                <div className="flex items-center gap-3">
                                    {photoUrl && <Avatar>
                                        <AvatarImage src={photoUrl} alt="@shadcn" />
                                        <AvatarFallback>icon</AvatarFallback>
                                    </Avatar>}
                                    <p className="hidden sm:block">{username}</p>
                                </div>
                            </Link>
                        </div>

                        <div className="flex gap-2 justify-end mb-[15px]">
                            <Button>編集</Button>
                            <Button onClick={deletePost} disabled={isLoading}>削除</Button>
                        </div>

                        <div>
                            <div className="preview">
                                <ReactMarkdown
                                    components={{
                                        code({ node, className, children, ...props }) {
                                            return <CodeBlock value={String(children)} {...props} />;
                                        }
                                    }}
                                >
                                    {description}
                                </ReactMarkdown>
                            </div>
                        </div>
                    </div>

                    <div className="flex justify-end items-center gap-3">
                        <Link href="/posts/2" target="_blank">
                            <div className="bg-muted py-2 px-2 flex items-center gap-3 cursor-pointer rounded-[5px]">
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
