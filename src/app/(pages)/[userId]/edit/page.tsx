import EditForm from "@/app/components/editProfile/form";
import Footer from "@/app/components/layouts/footer";
import Header from "@/app/components/layouts/header";
import { getUser } from "@/data/user";
import { authOptions } from "@/lib/next-auth/options";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

const EditProfilePage = async () => {

    const session = await getServerSession(authOptions)

    if(!session){
        redirect("/auth/login")
    }

    const user = await getUser(session.user.uid)

    if (!user) return

    const { id, username, bio, X, photoUrl } = user

    return (
        <div>
            <Header />
            <div className="bg-muted">
                <EditForm id={id} username={username} bio={bio ? bio : ""} X={X ? X : ""} photoUrl={photoUrl as string} />
            </div>
            <Footer />
        </div>
    )
}

export default EditProfilePage;
