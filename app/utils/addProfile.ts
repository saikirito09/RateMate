import { collection, addDoc } from "firebase/firestore";
import { db } from "./firebaseConfig";

export async function addProfile(profileData) {
  const docRef = await addDoc(collection(db, "profiles"), {
    ...profileData,
    score: 0,
    numRatings: 0,
    createdAt: new Date(),
    updatedAt: new Date(),
  });
  return docRef.id;
}
