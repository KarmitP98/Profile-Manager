import React, {useContext, useEffect, useState} from 'react'
import {auth} from "../firebase"

const AuthContext = React.createContext()

export function useAuth() {
    return useContext(AuthContext)
}

export function AuthProvider({children}) {
    const [currentUser, setCurrentUser] = useState();
    const [loading, setLoading] = useState(true)

    const value = {
        currentUser,
        signup,
        login,
        logout,
        resetpassword,
        updateEmail,
        updatePass
    }

    // Just change the below 2 functions to login to your Auth method!
    function signup(email, password) {
        return auth.createUserWithEmailAndPassword(email, password)
    }
    
    function login(email, password) {
        return auth.signInWithEmailAndPassword(email, password)
    }
    
    function updateEmail(email) {
        return currentUser.updateEmail(email)
    }
    
    function updatePass(password){
        return currentUser.updatePassword(password)
    }
    
    function logout(){
        return auth.signOut()
    }
    
    function resetpassword(email) {
        return auth.sendPasswordResetEmail(email)
    }

    useEffect(() => {
        // When component unmounts this is removed
        return auth.onAuthStateChanged(user => {
            setLoading(false)
            setCurrentUser(user)
        })
    }, []);

    return (
        <AuthContext.Provider value={value}>
            {/*Render the children only if we are not loading*/}
            {!loading && children}
        </AuthContext.Provider>
    )
}
