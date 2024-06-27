"use client"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"

import { useForm } from 'react-hook-form';

import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

const formShema = z.object({
    name: z.string().min(2, { message: "名前は2文字以上にしてください" }).max(6, { message: "名前は6文字以下にしてください" }),
    bio: z.string().max(100, { message: "100文字以下で入力してください。" }),
    x: z.string().nullable().optional()
})

type formType = z.infer<typeof formShema>

const EditForm = () => {

    const form = useForm<formType>({
        resolver: zodResolver(formShema),
        defaultValues: { name: "", bio: "", x: "" },
    })

    return (
        <div>
            <div className="w-[95%] mx-auto md:container flex justify-center">
                <div className="w-full lg:w-[60%] pt-[60px] pb-[80px]">
                    <div className="pb-[60px]">
                        <h2 className="text-[30px] font-bold text-center">Profile</h2>
                    </div>
                    <div className="bg-white lg:flex px-5 py-10 gap-3 rounded-[5px]">
                        <div className="w-full lg:w-[30%] flex justify-center ">
                            <Avatar className="w-[100px] h-[100px]">
                                
                                <AvatarImage src={"https://github.com/shadcn.png"} alt={"peng_uin"} />
                                <AvatarFallback>peng_uin</AvatarFallback>
                            </Avatar>
                        </div>
                        <div className="w-full lg:w-[60%]">
                            <Form {...form}>
                                <form className="space-y-8">
                                    <FormField
                                        name="name"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>名前</FormLabel>
                                                <FormControl>
                                                    <Input placeholder="ゆーた" className="focus:outline-none"/>
                                                </FormControl>
                                                <FormDescription>
                                                    サービスで表示する名前を入力してください
                                                </FormDescription>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                    <FormField
                                        name="bio"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Bio欄</FormLabel>
                                                <FormControl>
                                                    <Textarea placeholder="青山学院大学の大学生です。" {...field} className="resize-none h-[200px] focus:outline-none"/>
                                                </FormControl>
                                                <FormDescription>
                                                    Bio欄に表示される内容を入力してください
                                                </FormDescription>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                    <FormField
                                        name="x"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Xリンク</FormLabel>
                                                <FormControl>
                                                    <div className="flex items-center gap-2">
                                                        <div>https://x.com/</div>
                                                        <Input placeholder="y_ta" {...field} className="focus:outline-none"/>
                                                    </div>
                                                </FormControl>
                                                <FormDescription>
                                                    X(旧Twitter)のユーザー名を入力してください
                                                </FormDescription>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                    <Button type="submit">Submit</Button>
                                </form>
                            </Form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default EditForm;