"use client"
import { GithubAuthProvider, signInWithPopup } from "firebase/auth"
import { doc, getDoc, setDoc } from "firebase/firestore"
import { signIn } from "next-auth/react"
import { Button } from "@/components/ui/button"
import { auth, db } from "@/lib/firebase/client"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faGithub } from "@fortawesome/free-brands-svg-icons"
import { Dispatch, SetStateAction } from "react"

const SiginInWithGoogleBtn = ({isLoading, setIsLoading}:{isLoading: boolean, setIsLoading: Dispatch<SetStateAction<boolean>>}) => {

    const githubProvider = new GithubAuthProvider

    const signInWithGoogle = async () => {

        await signInWithPopup(auth, githubProvider).then(async (credential) => {

            setIsLoading(true)

            const idToken = await credential.user.getIdToken(true)

            //ここにuserを作るdb送信処理を書く。
            const { displayName, email, photoURL, uid } = credential.user

            console.log()

            const userDocRef = doc(db, "users", uid);
            const userDoc = await getDoc(userDocRef);

            if (!userDoc.exists() && displayName && email && photoURL) {
                //firestoreにデータを送信
                await setDoc(userDocRef, {
                    name: displayName,
                    email: email,
                    photoURL: photoURL,
                });

                //supabaseに保存するため、サーバー側に送信
                await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/user`, {
                    body: JSON.stringify({ idToken }),
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    method: "POST"
                })
            }
        
            signIn("credentials", { callbackUrl: `/${uid}`, idToken })
            setIsLoading(true)

        }).catch((err) => {
            //エラー情報をクライアントに伝える処理を書く。
            throw Error(err)

        })
    }

    return (
        <Button onClick={signInWithGoogle} className="flex gap-3" variant="outline">
            <FontAwesomeIcon icon={faGithub} />
            <p>Sign In with GitHub</p>
        </Button>
    )
}

export default SiginInWithGoogleBtn
