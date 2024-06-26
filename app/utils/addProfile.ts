import { collection, addDoc } from "firebase/firestore";
import { db } from "./firebaseConfig";

interface ProfileData {
  name: string;
  age: string;
  height: string;
  lookingFor: string;
  school: string;
  habits: string;
  interests: string;
  bio: string;
  images: string[];
}

export async function addProfile(profileData: ProfileData) {
  const docRef = await addDoc(collection(db, "profiles"), {
    ...profileData,
    score: 0,
    numRatings: 0,
    createdAt: new Date(),
    updatedAt: new Date(),
  });
  return docRef.id;
}
