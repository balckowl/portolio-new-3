"use client"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CircleHelp, ImageIcon, Pen, PenIcon, RefreshCw, Settings2, Trash2 } from "lucide-react"
import Link from "next/link";
import { format } from "date-fns";
import { Post } from "@prisma/client";
import { useRouter } from "next/navigation";
import toast, { Toaster } from "react-hot-toast";
import { ChangeEvent, useState } from "react";
import { CodeBlock } from "./codeBlock";
import ReactMarkdown from 'react-markdown'
import "./css/editer.css"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { storage } from "@/lib/firebase/client";
import Image from "next/image";
import Picker from "./picker";
import { Textarea } from "@/components/ui/textarea";
import { Dialog, DialogClose, DialogContent, DialogTrigger } from "@/components/ui/dialog";

const Article = ({ title, description, icon, createdAt, updatedAt, username, photoUrl, postId, comment, userId, uid }: Post & { username: string, photoUrl: string | null, postId: number, uid: string } & { comment: any }) => {


    const createdAtFormatted = format(createdAt, "yyyy/MM/dd");
    const updatedAtFormatted = format(updatedAt, "yyyy/MM/dd");

    const router = useRouter();

    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [isEditting, setIsEditting] = useState<boolean>(false);
    const [isEdittingComment, setIsEdittingComment] = useState<boolean>(false);

    const [currentTitle, setCurrentTitle] = useState<string>(title);
    const [currentDescription, setCurrentDescription] = useState<string>(description);
    const [currentIcon, setCurrentIcon] = useState<string>(icon);

    const [currentComment, setCurrentComment] = useState<string | null>(comment.description);

    const deletePost = async () => {
        try {
            setIsLoading(true);

            await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/posts/${postId}`, {
                method: "DELETE",
            })

            setIsLoading(false);

            router.push(`/${uid}`);
            router.refresh();
        } catch (e) {
            setIsLoading(false);
            toast.error("削除に失敗しました")
        }
    }

    const updatePost = async () => {
        if (!currentTitle || !currentDescription) {
            toast.error("入力値が不足しています");
            return;
        }


        setIsLoading(true);
        const loading = toast.loading("送信中...");

        try {
            const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/posts/${postId}`, {
                method: "PUT",
                body: JSON.stringify({
                    title: currentTitle,
                    description: currentDescription,
                    icon: currentIcon
                })
            }
            )

            console.log(res);
            setIsLoading(false);
            setIsEditting(false);

            toast.dismiss(loading);
            toast.success("更新できました");

            router.refresh();
        } catch (e) {
            toast.dismiss(loading);
            setIsLoading(false);
            toast.error("更新に失敗しました")
        }
    }


    const updateComment = async () => {

        setIsLoading(true);
        const loading = toast.loading("送信中...")

        try {
            const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/comment`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    postId: postId,
                    description: currentComment
                })
            })

            const data = await res.json();
            console.log(data);

            setIsLoading(false);
            toast.dismiss(loading);
            toast.success("送信が完了しました");
            router.refresh();

        } catch (e) {
            return;
        }
    }


    //画像を挿入する関数
    const handleImageChange = async (e: ChangeEvent<HTMLInputElement>) => {

        if (!e.target.files) return;
        const loading = toast.loading("アップロード中...");
        try {
            setIsLoading(true);

            const file = e.target.files[0]

            const storageRef = ref(storage, `images/${file?.name}`);

            if (file) {
                await uploadBytes(storageRef, file).then(() => {
                    console.log('Uploaded a blob or file!');
                })
            }

            const url = await getDownloadURL(storageRef)

            const imageMarkdown = `![](${url})`

            toast.dismiss(loading);
            toast.success("アップロードできました。");
            setCurrentDescription(currentDescription + imageMarkdown)
            setIsLoading(false)
        } catch (e) {
            toast.dismiss(loading);
            toast.error("アップロードできませんでした。");
            setIsLoading(false)
        }
    }

    return (
        <div className="py-[70px] flex items-center justify-center bg-muted min-h-[calc(100vh-75px-55px)]">
            <Toaster />
            <Tabs className="w-[92%] sm:container flex justify-center" defaultValue="markdown">
                <div className="w-full lg:w-[60%]">
                    <div className="mb-[10px] flex items-center gap-3">
                        {!isEditting ? (
                            <div>
                                <Image src={`/images/editor/face${icon}.png`} alt="" width="50" height="50" />
                            </div>) : (
                            <Popover>
                                <PopoverTrigger asChild>
                                    <Button variant="outline">
                                        <Settings2 />
                                    </Button>
                                </PopoverTrigger>
                                <PopoverContent className="w-full" side="bottom" align="start">
                                    <Picker icon={currentIcon} setIcon={setCurrentIcon} />
                                </PopoverContent>
                            </Popover>)}
                        {!isEditting ? (
                            <h2 className="text-[25px] lg:text-[30px] font-bold break-words w-full whitespace-pre-wrap">{title}</h2>
                        ) : (
                            <input type="text" placeholder="ここにタイトルを入力してください。" className="w-full bg-muted focus:outline-none text-[18px] md:text-[25px] lg:text-[30px]" value={currentTitle} onChange={(e) => setCurrentTitle(e.target.value)} />
                        )}
                    </div>

                    <div className={`p-2 ${comment.description ? "bg-green-300 dark:bg-green-600" : "bg-red-300 dark:bg-red-500"} rounded-tr-lg rounded-tl-lg p-5`}>
                        <div className="flex items-center justify-between">
                            <p className="font-bold text-[30px]">{comment.description ? "解決" : "挫折中..."}</p>
                            {userId == uid && !isEdittingComment && (<Button onClick={() => setIsEdittingComment(true)} disabled={isLoading} className="flex gap-3">
                                <PenIcon width="15" height="15" />
                            </Button>)}
                            {userId == uid && isEdittingComment && (<Button onClick={() => { updateComment(); setIsEdittingComment(false) }}>投稿</Button>)}
                        </div>
                        {isEdittingComment && (<div className="mt-[10px]">
                            <Textarea className="w-full h-[100px] resize-none rounded-lg outline-none p-2 text-[14px]" placeholder="解決時のエピソードを教えてください。" value={currentComment as string} onChange={(e) => { setCurrentComment(e.target.value.trim()); }} />
                        </div>)}
                        {!isEdittingComment && <div>{comment.description}</div>}
                    </div>

                    <div className="min-h-[400px] bg-white dark:bg-zinc-700 p-5 rounded-[5px] mb-[10px]">
                        <div className="border-[1px] border-muted rounded-[5px] flex justify-between p-3 mb-[15px]">
                            <div className="flex-col sm:flex-row flex sm:items-center sm:gap-3">
                                <div className="text-[13px]">{createdAtFormatted} </div>
                                <div className="flex items-center gap-1 text-[13px]">
                                    <RefreshCw width={18} height={18} />
                                    <div>{updatedAtFormatted}</div>
                                </div>
                            </div>
                            <Link href={`/${userId}`}>
                                <div className="flex items-center gap-3">
                                    {photoUrl && <Avatar>
                                        <AvatarImage src={photoUrl} alt="@shadcn" />
                                        <AvatarFallback>{username}</AvatarFallback>
                                    </Avatar>}
                                    <p className="hidden sm:block">{username}</p>
                                </div>
                            </Link>
                        </div>


                        {userId == uid && <div className={`flex justify-end mb-[15px]`}>
                            <div className={`flex gap-2`}>
                                {isEditting ? (
                                    <Button onClick={updatePost} disabled={isLoading}>更新</Button>
                                ) : (<Button onClick={() => setIsEditting(true)}>編集</Button>)}
                                <Dialog>
                                    <DialogTrigger asChild>
                                        <Button disabled={isLoading}>削除</Button>
                                    </DialogTrigger>
                                    <DialogContent>
                                        <p className="text-center">本当に削除しますか? </p>
                                        <Trash2 className="mx-auto" width="100" height="100"/>
                                        <div className="flex gap-5 justify-center">
                                            <Button onClick={deletePost} disabled={isLoading}>はい</Button>
                                            <DialogClose asChild>
                                                <Button>いいえ</Button>
                                            </DialogClose>
                                        </div>
                                    </DialogContent>
                                </Dialog>
                            </div>
                        </div>}

                        {!isEditting ? (
                            <div className="preview break-words whitespace-pre-wrap">
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
                        ) : (
                            <div>
                                <div>
                                    <TabsContent className="preview" value="password">
                                        <ReactMarkdown
                                            components={{
                                                code({ node, className, children, ...props }) {
                                                    return <CodeBlock value={String(children)} {...props} />;
                                                }
                                            }}
                                        >
                                            {currentDescription}
                                        </ReactMarkdown>
                                    </TabsContent>
                                    <TabsContent className="relative" value="markdown">
                                        <textarea value={currentDescription} className="dark:bg-zinc-700 w-full h-[400px] resize-none focus:outline-none" onChange={(e) => setCurrentDescription(e.target.value)}></textarea>
                                        <div onClick={() => document.getElementById('file-input')?.click()} className="bg-yellow-200 dark:text-zinc-700 w-12 h-12 flex items-center justify-center absolute bottom-[10px] right-[10px] rounded-full cursor-pointer">
                                            <ImageIcon />
                                            <input type="file" id="file-input" className="hidden" onChange={handleImageChange} accept=".jpg,.gif,.png,image/gif,image/jpeg,image/png" />
                                        </div>
                                    </TabsContent>
                                </div>
                            </div>
                        )}
                    </div>
                    {isEditting &&
                        (<div className="flex justify-end items-center gap-3">
                            <Link href="/posts/1" target="_blank">
                                <div className="bg-muted py-2 px-2 flex items-center gap-3 cursor-pointer rounded-[5px]">
                                    <CircleHelp width={20} height={20} />
                                </div>
                            </Link>
                            <TabsList>
                                <TabsTrigger value="markdown" >Markdown</TabsTrigger>
                                <TabsTrigger value="password" >Preview</TabsTrigger>
                            </TabsList>
                        </div>)}
                </div>
            </Tabs>
        </div>
    )
}

export default Article
