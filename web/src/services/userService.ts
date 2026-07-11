import { doc, serverTimestamp, setDoc } from "firebase/firestore";
import { db } from "../config";

type CreateUserProfileParams = {
  uid: string;
  email: string | null;
};

type SaveOnboardingParams = {
  uid: string;
  genres: string[];
  platforms: string[];
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

export async function saveOnboarding({
  uid,
  genres,
  platforms,
}: SaveOnboardingParams) {
  await setDoc(
    doc(db, "users", uid),
    {
      genres,
      platforms,
      onboardingCompleted: true,
      updatedAt: serverTimestamp(),
    },
    { merge: true }
  );
}