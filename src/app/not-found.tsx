import Footer from "@/app/components/layouts/footer";
import Header from "@/app/components/layouts/header";
import Image from "next/image"

export default function NotFound() {
  return (
    <div>
        <Header/>
        <div className="bg-muted conntainer mx-auto py-[100px] min-h-[calc(100vh-80px-60px)]">
            <Image src="/images/not-found/404.png" width={300} height={300} alt="404" className="mx-auto mb-5" />
            <p className="text-[20px] lg:text-[40px] text-center">404 Not Found</p>
        </div>
        <Footer/>
    </div>
  )
}