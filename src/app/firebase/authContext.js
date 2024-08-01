import {useContext, createContext, useState,useEffect} from 'react';
import {signInWithPopup, signOut, onAuthStateChanged, GoogleAuthProvider} from 'firebase/auth';
import {auth} from './config';
import nookies from 'nookies';

const AuthContext = createContext();

const AuthProvider = ({children}) => {
	const [user, setUser] = useState(null);

	const googleSignIn = () => {
		const provider = new GoogleAuthProvider();
		 signInWithPopup(auth, provider);
	};
	
	const logOut = () => signOut(auth);
	
	useEffect(()=> {
			const unsubscribe = onAuthStateChanged(auth, (currUser) => {
				if (currUser) {
					setUser(currUser);
					currUser.getIdToken().then((token) => {
						// console.log(token);
						nookies.set(undefined, 'token', token, {path: '/'});
					})
				}	else {
					setUser(null);
					nookies.set(undefined, 'token', '', {path: '/'});
				}
			});
			return () => unsubscribe();
		}, []);
	
	return (
		<AuthContext.Provider value={{user, googleSignIn, logOut}}> 
            {children} 
        </AuthContext.Provider>
	);
}

const useAuth = () => {
	return useContext(AuthContext);
}

export {useAuth, AuthProvider};