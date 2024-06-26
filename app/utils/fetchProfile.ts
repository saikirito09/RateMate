import { db } from "./firebaseConfig";
import {
  collection,
  getDocs,
  doc,
  getDoc,
  updateDoc,
  query,
  orderBy,
  limit,
} from "firebase/firestore";

export const fetchProfiles = async () => {
  const profilesCollection = collection(db, "profiles");
  const profileSnapshot = await getDocs(profilesCollection);
  const profileList = profileSnapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));
  return profileList;
};

export const rateProfile = async (id: string, rating: number) => {
  try {
    const profileRef = doc(db, "profiles", id);
    const profileDoc = await getDoc(profileRef);

    if (!profileDoc.exists()) {
      return;
    }

    const profileData = profileDoc.data();

    if (profileData) {
      const newNumRatings = (profileData.numRatings || 0) + 1;
      const newScore =
        ((profileData.score || 0) * (profileData.numRatings || 0) + rating) /
        newNumRatings;

      await updateDoc(profileRef, {
        score: newScore,
        numRatings: newNumRatings,
      });
    }
  } catch (error) {
    console.error("Error updating profile:", error);
  }
};

export const fetchTopProfiles = async (topCount: number) => {
  const profilesCollection = collection(db, "profiles");
  const q = query(
    profilesCollection,
    orderBy("score", "desc"),
    limit(topCount),
  );
  const profileSnapshot = await getDocs(q);
  const profileList = profileSnapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));
  return profileList;
};
