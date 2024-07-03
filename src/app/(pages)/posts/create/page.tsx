import Editor from "@/app/components/posts/editor";
import { authOptions } from "@/lib/next-auth/options";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

const CreatePage = async() => {

    const session = await getServerSession(authOptions)

    if(!session){
        redirect("/auth/login")
    }

    return (
        <div className="bg-muted min-h-screen">
            <Editor uid={session.user.uid}/>
        </div>
    )
}

export default CreatePage;
