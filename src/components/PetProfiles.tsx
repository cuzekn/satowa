import { collection, deleteDoc, doc, onSnapshot, query } from 'firebase/firestore';
import { FC, useEffect, useState } from 'react'
import { db } from 'src/firebase/firebaseConfig';

type Pet = {
  id: string;
  petName: string;
  petImage: string;
  petImageName: string;
}

const PetProfiles:FC<Pet> = () => {
  const [petProfile, setPetProfile] = useState([
    {
      id: '',
      petName: '',
      petImage: '',
      petImageName: '',
    },
  ]);

  useEffect(() => {
    const q = query(collection(db, "petProfile"));
    
    onSnapshot(q, (snapshot) => {
      setPetProfile(
        snapshot.docs.map((doc) => ({
          id: doc.id,
          petName: doc.data().petName,
          petImage: doc.data().petImage,
          petImageName: doc.data().petImageName,
        }))
      );
    });
  }, []);

  return (
    <div className="grid grid-cols-2 justify-items-center gap-y-5 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 2xl:grid-cols-7">
    {petProfile.map((post) => (
      <div
        key={post.id}
        className="w-40 rounded-lg bg-green-800 p-4 text-center shadow-xl"
      >
        <div className="flex justify-center ">
          <img
            src={post.petImage}
            alt="ペットの画像"
            className="h-32 w-full rounded-full object-cover"
          />
        </div>
        <div className="py-2 text-white">{post.petName}</div>
        <button className="text-orange-600">Tap</button>
      </div>
    ))}
  </div>
  )
}

export default PetProfiles