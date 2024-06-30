"use client"


import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CircleHelp, Image, RefreshCw, Settings2 } from "lucide-react"
import Link from "next/link";
import { format } from "date-fns";
import { Post, User } from "@prisma/client";
import { useRouter } from "next/navigation";
import toast, { Toaster } from "react-hot-toast";
import { ChangeEvent, useState } from "react";
import { CodeBlock } from "./codeBlock";
import ReactMarkdown from 'react-markdown'
import "./css/editer.css"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import Picker from '@emoji-mart/react';
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { storage } from "@/lib/firebase/client";




const Article = ({ title, description, icon, createdAt, updatedAt, id, username, photoUrl, postId }: Post & { id: string, username: string, photoUrl: string | null, postId: number }) => {


   const createdAtFormatted = format(createdAt, "yyyy/MM/dd");
   const updatedAtFormatted = format(updatedAt, "yyyy/MM/dd");


   const router = useRouter();


   const [isLoading, setIsLoading] = useState<boolean>(false);
   const [isEditting, setIsEditting] = useState<boolean>(false);


   const [currentTitle, setCurrentTitle] = useState<string>(title);
   const [currentDescription, setCurrentDescription] = useState<string>(description);
   const [currentIcon, setCurrentIcon] = useState<string>(icon);


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


   const updatePost = async () => {
       if (!currentTitle || !currentDescription) {
           toast.error("入力値が不足しています");
           return;
       }


       setIsLoading(true);
       const loading = toast.loading("送信中...");


       try {
           const res = await fetch(`http://localhost:3000/api/v1/posts/${postId}`, {
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
       <div className="py-[70px] flex items-center justify-center bg-muted min-h-[calc(100vh-55px-55px)]">
           <Toaster />


           <Tabs className="w-[92%] sm:container flex justify-center" defaultValue="markdown">
               <div className="w-full lg:w-[60%]">


                   <div className="mb-[10px] flex items-center gap-3">
                       {!isEditting ? (
                           <div className="text-[30px] lg:text-[40px]">{icon}</div>) : (
                           <Popover>
                               <PopoverTrigger asChild>
                                   <Button variant="outline">
                                       <Settings2 />
                                   </Button>
                               </PopoverTrigger>
                               <PopoverContent className="w-full" side="right">
                                   <div className="flex w-full h-[70px] border-[1px] border-[#eee] rounded-[5px] mb-[20px]">
                                       <div className="w-[20%] h-full text-[40px] bg-[#eee] rounded-tl-[5px] rounded-bl-[5px] flex items-center justify-center">
                                           {currentIcon} {/* 絵文字を正しく表示 */}
                                       </div>
                                       <div className="w-[80%] h-full flex items-center justify-center">失敗度をアイコンで表そう</div>
                                   </div>
                                   <Picker onEmojiSelect={(emoji: any) => { setCurrentIcon(emoji.native); }} />
                               </PopoverContent>
                           </Popover>)}
                       {!isEditting ? (
                           <h2 className="text-[20px] sm:text-[25px] lg:text-[30px] font-bold">{title}</h2>
                       ) : (
                           <input type="text" placeholder="ここにタイトルを入力してください。" className="w-full bg-muted focus:outline-none text-[18px] md:text-[25px] lg:text-[30px]" value={currentTitle} onChange={(e) => setCurrentTitle(e.target.value)} />
                       )}
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
                           {isEditting ? (
                               <Button onClick={updatePost} disabled={isLoading}>更新</Button>
                           ) : (<Button onClick={() => setIsEditting(true)}>編集</Button>)}
                           <Button onClick={deletePost} disabled={isLoading}>削除</Button>
                       </div>


                       {!isEditting ? (
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
                                       <textarea value={currentDescription} className="w-full h-[400px] resize-none focus:outline-none" onChange={(e) => setCurrentDescription(e.target.value)}></textarea>
                                       <div onClick={() => document.getElementById('file-input')?.click()} className="bg-yellow-200 w-12 h-12 flex items-center justify-center absolute bottom-[10px] right-[10px] rounded-full cursor-pointer">
                                               <Image />
                                               <input type="file" id="file-input" className="hidden" onChange={handleImageChange} accept=".jpg,.gif,.png,image/gif,image/jpeg,image/png" />
                                           </div>
                                   </TabsContent>
                               </div>
                           </div>
                       )}
                   </div>


                   {isEditting &&
                       (<div className="flex justify-end items-center gap-3">
                           <Link href="/posts/2" target="_blank">
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



