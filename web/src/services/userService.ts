import { doc, serverTimestamp, setDoc } from "firebase/firestore";
import { getDoc } from "firebase/firestore";
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

type SaveM3uProfileParams = {
  uid: string;
  name: string;
  url: string;
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

export async function getUserProfile(uid: string) {
  const snapshot = await getDoc(doc(db, "users", uid));

  if (!snapshot.exists()) {
    return null;
  }

  return snapshot.data() as {
    email: string | null;
    onboardingCompleted: boolean;
    genres: string[];
    platforms: string[];
  };
}

export async function saveM3uProfile({
  uid,
  name,
  url,
}: SaveM3uProfileParams) {
  await setDoc(doc(db, "users", uid, "m3uProfiles", name), {
    name,
    url,
    type: "m3u",
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
  });
}