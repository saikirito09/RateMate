import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { storage } from "./firebaseConfig";

export async function uploadImage(file: File) {
  const storageRef = ref(storage, `images/${file.name}_${Date.now()}`);
  await uploadBytes(storageRef, file);
  return await getDownloadURL(storageRef);
}
