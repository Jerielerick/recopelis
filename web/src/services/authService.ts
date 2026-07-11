import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import { auth } from "../config";
import { createUserProfile } from "./userService";

export async function registerUser(email: string, password: string) {
  const credential = await createUserWithEmailAndPassword(auth, email, password);

  await createUserProfile({
    uid: credential.user.uid,
    email: credential.user.email,
  });

  return credential.user;
}

export async function loginUser(email: string, password: string) {
  const credential = await signInWithEmailAndPassword(auth, email, password);
  return credential.user;
}

export async function logoutUser() {
  await signOut(auth);
}