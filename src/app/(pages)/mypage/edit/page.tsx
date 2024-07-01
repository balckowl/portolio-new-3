import EditForm from "@/app/components/editProfile/form";
import Footer from "@/app/components/layouts/footer";
import Header from "@/app/components/layouts/header";
import { getUser } from "@/data/user";

const EditProfilePage = async () => {

    const user = await getUser("rocket_peng")

    if (!user) return

    const { id, username, bio, X, photoUrl } = user

    return (
        <div>
            <Header />
            <div className="bg-[#eee]">
                <EditForm id={id} username={username} bio={bio ? bio : ""} X={X ? X : ""} photoUrl={photoUrl as string} />
            </div>
            <Footer />
        </div>
    )
}

export default EditProfilePage;
