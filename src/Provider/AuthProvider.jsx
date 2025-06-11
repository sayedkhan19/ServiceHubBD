import app from '../fireBase/firebase.config';
import { createContext, useEffect, useState } from 'react';
import { createUserWithEmailAndPassword, getAuth, GoogleAuthProvider, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile } from "firebase/auth";


export const AuthContext = createContext();
const auth = getAuth(app);

const AuthProvider = ({children}) => {
    const [user,setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    const createUser = (email,password)=>{
        setLoading(true);
        return createUserWithEmailAndPassword(auth,email,password)
    }

    useEffect(()=> {
        const unsubscribe = onAuthStateChanged(auth, (currentUser)=>{
            setUser(currentUser);
            setLoading(false)
            console.log(currentUser)
        })
        return ()=>{
            unsubscribe();
        }
    },[]);

    const signIn = (email,password)=>{
        setLoading(true);
        return signInWithEmailAndPassword(auth,email,password)
    }

    const logOut = ()=>{
        return signOut(auth);
    }


    const updateUser = (updatedData) =>{
        return updateProfile(auth.currentUser, updatedData).then(() => {
            
            setUser({ ...auth.currentUser });
          });

    }


    const provider = new GoogleAuthProvider();
    const googlePopUp = ()=>{
        return signInWithPopup(auth,provider);
    };


    const authInfo = {
        user,
        setUser,
        loading,
        setLoading,
        createUser,
        signIn,
        logOut,
        updateUser,
        googlePopUp,


    }
    return (
        <AuthContext value={authInfo}>
            {children}
        </AuthContext>
    );
};

export default AuthProvider;