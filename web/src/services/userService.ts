import { doc, serverTimestamp, setDoc } from "firebase/firestore";
import { db } from "../config";

type CreateUserProfileParams = {
  uid: string;
  email: string | null;
};

export async function createUserProfile({
  uid,
  email,
}: CreateUserProfileParams) {
  await setDoc(doc(db, "users", uid), {
    email,
    createdAt: serverTimestamp(),
    onboardingCompleted: false,
    genres: [],
    platforms: [],
  });
}