import { onAuthStateChanged, signInWithEmailAndPassword } from 'firebase/auth'
import { useRouter } from 'next/router'
import { useState } from 'react'
import Loading from './Loading'
import { auth } from '../src/config/firebase.config'

export const AuthCheck = (props) => {
    const [loginEmail, setLoginEmail] = useState("");
    const [loginPassword, setLoginPassword] = useState("");
    const [textError, setTextError] = useState("")
    const [user, setUser] = useState({});

    onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
  })
  const router = useRouter()
  // const user = useUser() // you need to implement this. In this example, undefined means things are still loading, null means user is not signed in, anything truthy means they're signed in
  
  if (typeof window !== 'undefined' && user === null) router.push('/');


  if(!user) return <Loading /> // a loading component that prevents the page from rendering
   
  return props.children
}