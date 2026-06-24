"use client";

import { useEffect } from "react";
import { useState } from "react";
import { auth } from "@/lib/firebase";
import { onAuthStateChanged } from "firebase/auth";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();
useEffect(() => {
  const unsubscribe = onAuthStateChanged(auth, (user) => {
    if (user) {
      router.push("/");
    }
  });

  return () => unsubscribe();
}, [router]);
  const handleSignup = async () => {
    try {
      await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      alert("Account Created!");
    } catch (error: any) {
      alert(error.message);
    }
  };

  const handleLogin = async () => {
  try {
    await signInWithEmailAndPassword(
      auth,
      email,
      password
    );

    router.push("/");
  } catch (error: any) {
    alert(error.message);
  }
};

  return (
    <div style={{ padding: "20px" }}>
      <h1>Login / Signup</h1>

      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />

      <br />
      <br />

      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />

      <br />
      <br />

      <button onClick={handleSignup}>
        Sign Up
      </button>

      <button
        onClick={handleLogin}
        style={{ marginLeft: "10px" }}
      >
        Login
      </button>
    </div>
  );
}