import Article from "@/app/components/posts/article"
import { getUserPost } from "@/data/post"

const page = async({params}:{params:{id:string}}) => {

  const post = await getUserPost("rocket_peng", Number(params.id));
  console.log(post);

  if (!post) {
    return (
      <p>404 ざんねん！</p>
    )
  }

  return (
    <div>
        <Article postId={post.postId} userId={post.userId} title={post.title} description={post.description} icon={post.icon} createdAt={post.createdAt} updatedAt={post.updatedAt} id={post.user.id} username={post.user.username} photoUrl={post.user.photoUrl}/>
    </div>
  )
}

export default page