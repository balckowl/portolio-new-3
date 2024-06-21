import PostList from "@/app/components/mypage/post/postList"
import UserProfile from "@/app/components/mypage/userPorfile"

const page = () => {
  return (
    <div>
        <UserProfile />
        <PostList />
    </div>
  )
}

export default page