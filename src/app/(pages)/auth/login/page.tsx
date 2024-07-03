"use client"
import Loading from "@/app/components/auth/loading";
import SiginInWithGoogleBtn from "@/app/components/auth/signInWithGithubBtn";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { redirect, useRouter } from "next/navigation";
import { useState } from "react";

export default function Page() {

  const { data: session } = useSession()
  const router = useRouter()

  if (session) {
    router.push(`/${session.user.uid}`)
  }

  const [isLoading, setIsLoading] = useState(false)

  if (isLoading) {
    return <Loading />
  }

  return (
    <div className="flex flex-col items-center pt-[100px]">
      <div className="text-[30px] text-center font-bold">Sign In To Portolio</div>
      <Image src="/images/login/夕焼けを見て思索に耽る人.png" alt="夕焼けを見て思索に耽る人のイラスト" width={270} height={270} className="mb-3" />
      <SiginInWithGoogleBtn isLoading={isLoading} setIsLoading={setIsLoading} />
    </div>
  )
}
