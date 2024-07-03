import Footer from "@/app/components/layouts/footer"
import Header from "@/app/components/layouts/header"
import PostList from "@/app/components/mypage/post/postList"
import UserProfile from "@/app/components/mypage/userPorfile"
import { getUserPosts } from "@/data/post"
import { authOptions } from "@/lib/next-auth/options"
import { getServerSession } from "next-auth"
import { redirect } from "next/navigation"

const page = async ({ params }: { params: { userId: string } }) => {

    const session = await getServerSession(authOptions)
    if (!session) {
        redirect("/auth/login")
    }
    const { userId } = params
    const userPosts = await getUserPosts(userId)

    return (
        <div>
            <Header />
            <UserProfile userId={userId} uid={session.user.uid} />
            <PostList userPosts={userPosts}/>
            <Footer />
        </div>
    )
}

export default page
