import { initializeApp } from "firebase/app";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword  } from "firebase/auth";
import { GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyADIXACUG53nCUoU2ZpGelGLfoqjjoqzKQ",
  authDomain: "satowa-670c6.firebaseapp.com",
  projectId: "satowa-670c6",
  storageBucket: "satowa-670c6.appspot.com",
  messagingSenderId: "1065875301222",
  appId: "1:1065875301222:web:669f00d53671245a575ea7",
  measurementId: "G-P3HR0ST89C"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

export { auth, provider };

export const singupUserWithEmailAndPassword = async (email: string, password: string) => {
  const auth = getAuth();

  try {
    const user = await createUserWithEmailAndPassword(auth, email, password);

    alert('登録しました');

    return user;
  } catch(error) {
    alert('登録失敗')
    console.log(error);    
  }
}
