import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from 'src/firebase/firebaseConfig';
import { Header } from 'src/components/Layout/Header';

const index = () => {
  const router = useRouter()

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user){
        router.push("/home")
      } else {
        router.push("/login")
      }
    })
  }, [])

  return (
  <Header>
    <p>Loading...</p>
  </Header>
  )
};

export default index;