"use client"

import { signOut as signOutNextAuth, useSession } from "next-auth/react";
import { signOut as signOutFirebase } from "firebase/auth";
import { auth } from "@/lib/firebase/client";

export default function SignOutBtn() {

    const logOut = async () => {

        await signOutFirebase(auth)
        signOutNextAuth({ callbackUrl: "/" })
    }

    return (
        <li onClick={logOut}>
            ログアウト
        </li>
    )
}
