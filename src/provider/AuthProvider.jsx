import { createContext, useEffect, useState } from "react";
import PropTypes from 'prop-types';
import { createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut } from "firebase/auth";
import { auth } from "./firebase.config";
import useAxiosPublic from "../hooks/useAxiosPublic";
import { useQuery } from "@tanstack/react-query";

export const AuthContext = createContext(null);

const AuthProvider = ({ children }) => {

    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const axiosPublic = useAxiosPublic();
    const [isEmployee, setIsEmployee] = useState(false);
    const [isAdmin, setIsAdmin] = useState(false);

    
    const { data: userData } = useQuery({
        queryKey: ['userData'],
        queryFn: async () => {
            const res = await axiosPublic.get('/employees');
            const data = res.data;
            const isUserEmployee = data.find(user => user.role === 'employee')
            const isUserAdmin = data.find(user => user.role === 'admin')
            if (isUserEmployee) {
                setIsEmployee(true);
                setIsAdmin(false)
            }
            if (isUserAdmin) {
                setIsEmployee(false);
                setIsAdmin(true)
            }
            const loggedUserData = data.find(loadedUser => loadedUser.email === user.email);
            return loggedUserData;
        }
    });

    console.log(userData);


    useEffect(() => {
        const unSubscribe = onAuthStateChanged(auth, currentUser => {
            setLoading(false);
            setUser(currentUser);
        })
        return () => {
            unSubscribe()
        }
    }, []);

    const signUpUser = (email, password) => {
        setLoading(true);
        return createUserWithEmailAndPassword(auth, email, password);
    }

    const signInUser = (email, password) => {
        setLoading(true);
        return signInWithEmailAndPassword(auth, email, password)
    }

    const signOutUser = () => {
        setLoading(true);
        return signOut(auth);
    }

    const googleSignIn = provider => {
        setLoading(true);
        return signInWithPopup(auth, provider);
    }

    const authInfo = { user, loading, signUpUser, signInUser, signOutUser, googleSignIn, isAdmin, isEmployee}

    return (
        <AuthContext.Provider value={authInfo}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;

AuthProvider.propTypes = {
    children: PropTypes.object,
}