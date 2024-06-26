import { db } from "./firebaseConfig";
import {
  collection,
  getDocs,
  doc,
  getDoc,
  updateDoc,
} from "firebase/firestore";

export const fetchProfiles = async () => {
  const profilesCollection = collection(db, "profiles");
  const profileSnapshot = await getDocs(profilesCollection);
  const profileList = profileSnapshot.docs.map((doc) => {
    const data = doc.data();
    console.log("Fetched Document ID:", doc.id); // Debug log for document ID
    console.log("Fetched Data:", data); // Debug log for data
    return {
      id: doc.id, // Use document ID as id
      ...data,
    };
  });

  console.log("Fetched Profiles: ", profileList); // Debug log for profile list

  return profileList;
};

export const rateProfile = async (id: string, rating: number) => {
  try {
    const profileRef = doc(db, "profiles", id);
    const profileDoc = await getDoc(profileRef);

    if (!profileDoc.exists()) {
      console.error(`Profile with ID ${id} does not exist.`);
      return;
    }

    const profileData = profileDoc.data();

    if (profileData) {
      const newNumRatings = (profileData.numRatings || 0) + 1;
      const newScore =
        ((profileData.score || 0) * (profileData.numRatings || 0) + rating) /
        newNumRatings;

      console.log("Updating profile with id:", id);
      console.log(
        "Old score:",
        profileData.score,
        "Old numRatings:",
        profileData.numRatings,
      );
      console.log("New score:", newScore, "New numRatings:", newNumRatings);

      await updateDoc(profileRef, {
        score: newScore,
        numRatings: newNumRatings,
      });

      console.log("Profile updated successfully");
    } else {
      console.error("Profile data is undefined");
    }
  } catch (error) {
    console.error("Error updating profile:", error);
  }
};
