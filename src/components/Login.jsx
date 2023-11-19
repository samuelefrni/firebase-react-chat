import React from 'react'
import { auth, googleProvider } from '../config/firebase'
import { signInWithPopup } from 'firebase/auth'
import Cookies from 'universal-cookie'
import LoginCSS from "../CSSModule/Login.module.css"

const Login = ({ setIsAuth }) => {
    const cookies = new Cookies();

    const signInWithGoogle = async () => {
        try {
            const currentUser = await signInWithPopup(auth, googleProvider);
            cookies.set("auth-token", currentUser.user.refreshToken);
            setIsAuth(true);
        } catch (e) {
            console.error(e)
        }
    }

    return (
        <div className={LoginCSS.mainContainer}>
            <p className={LoginCSS.p}>Let's go with Google!</p>
            <button className={LoginCSS.button} onClick={signInWithGoogle}>Sign in</button>
        </div>
    )
}

export default Login