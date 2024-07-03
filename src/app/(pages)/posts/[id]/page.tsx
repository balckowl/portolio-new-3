import Footer from "@/app/components/layouts/footer";
import Header from "@/app/components/layouts/header";
import Article from "@/app/components/posts/article"
import NotFound from "@/app/not-found";
import { getPost } from "@/data/post"
import { authOptions } from "@/lib/next-auth/options";
import { getServerSession } from "next-auth";


const page = async ({ params }: { params: { id: string } }) => {

    const session = await getServerSession(authOptions)
    if(!session){
        return
    }
    
    const postId = Number(params.id);
    if (isNaN(postId)) {
        return <NotFound />;  // 数字ではない場合のエラーハンドリング
    }

    const post = await getPost(postId);

    if (!post) {
        return (
            <NotFound />
        )
    }


    console.log(post.comment)


    return (
        <div>
            <Header />
            <Article postId={post.postId} uid={session.user.uid} userId={post.userId} title={post.title} description={post.description} icon={post.icon} createdAt={post.createdAt} updatedAt={post.updatedAt} username={post.user.username} photoUrl={post.user.photoUrl} comment={post.comment} />
            <Footer />
        </div>
    )
}


export default page



