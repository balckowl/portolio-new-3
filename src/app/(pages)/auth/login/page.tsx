import SiginInWithGoogleBtn from "@/app/components/auth/signInWithGoogleBtn";
import Image from "next/image";

export default function Page() {
  return (
    <div className="flex flex-col items-center pt-[100px]">
      <div className="text-[30px] text-center font-bold">Sign In To Portolio</div>
      <Image src="/images/login/夕焼けを見て思索に耽る人.png" alt="夕焼けを見て思索に耽る人のイラスト" width={270} height={270} className="mb-3"/>
      <SiginInWithGoogleBtn />
    </div>
  )
}
