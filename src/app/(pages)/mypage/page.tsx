import Footer from "@/app/components/layouts/footer"
import Header from "@/app/components/layouts/header"
import PostList from "@/app/components/mypage/post/postList"
import UserProfile from "@/app/components/mypage/userPorfile"
import { getUserPosts } from "@/data/post"

const page = async () => {

    const userPosts = await getUserPosts("rocket_peng")

    return (
        <div>
            <Header />
            <UserProfile />
            <PostList userPosts={userPosts} />
            <Footer />
        </div>
    )
}

export default page
