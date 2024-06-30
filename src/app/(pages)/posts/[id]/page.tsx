import Footer from "@/app/components/layouts/footer";
import Header from "@/app/components/layouts/header";
import Article from "@/app/components/posts/article"
import { getUserPost } from "@/data/post"


const page = async ({ params }: { params: { id: string } }) => {


   const post = await getUserPost("rocket_peng", Number(params.id));


   if (!post) {
       return (
           <p>404 ざんねん！</p>
       )
   }


   console.log(post)


   return (
       <div>
           <Header />
           <Article postId={post.postId} userId={post.userId} title={post.title} description={post.description} icon={post.icon} createdAt={post.createdAt} updatedAt={post.updatedAt} id={post.user.id} username={post.user.username} photoUrl={post.user.photoUrl} comment={post.comment ? post.comment : ""}/>
           <Footer />
       </div>
   )
}


export default page



