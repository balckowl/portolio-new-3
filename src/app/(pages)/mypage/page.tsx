import PostList from "@/app/components/mypage/post/postList"
import UserProfile from "@/app/components/mypage/userPorfile"
import { getUserPosts } from "@/data/post"

const page = async() => {

  const userPosts = await getUserPosts("rocket_peng")
  
  return (
    <div>
        <UserProfile />
        <PostList userPosts={userPosts}/>
    </div>
  )
}

export default page