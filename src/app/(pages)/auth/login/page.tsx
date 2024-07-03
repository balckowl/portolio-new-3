import SiginInWithGoogleBtn from "@/app/components/auth/signInWithGoogleBtn";
import { authOptions } from "@/lib/next-auth/options";
import { getServerSession } from "next-auth";
import Image from "next/image";
import { redirect } from "next/navigation";

export default async function Page() {

  const session = await getServerSession(authOptions)

  if(session){
    redirect(`/${session.user.uid}`)
  }

  return (
    <div className="flex flex-col items-center pt-[100px]">
      <div className="text-[30px] text-center font-bold">Sign In To Portolio</div>
      <Image src="/images/login/夕焼けを見て思索に耽る人.png" alt="夕焼けを見て思索に耽る人のイラスト" width={270} height={270} className="mb-3"/>
      <SiginInWithGoogleBtn />
    </div>
  )
}
