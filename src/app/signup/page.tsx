"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabase-client";

export default function SignupPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  async function handleSignup(
    e: React.FormEvent
  ) {
    e.preventDefault();

    const { error } = await supabase.auth.signUp({
      email,
      password,
    });

    if (error) {
      alert(error.message);
      return;
    }

    alert("회원가입 성공!");
  }

  return (
    <main className="max-w-md mx-auto p-8">
      <h1 className="text-3xl font-bold mb-6">
        회원가입
      </h1>

      <form
        onSubmit={handleSignup}
        className="space-y-4"
      >
        <input
          type="email"
          placeholder="이메일"
          value={email}
          onChange={(e) =>
            setEmail(e.target.value)
          }
          className="border rounded-lg px-4 py-2 w-full"
        />

        <input
          type="password"
          placeholder="비밀번호"
          value={password}
          onChange={(e) =>
            setPassword(e.target.value)
          }
          className="border rounded-lg px-4 py-2 w-full"
        />

        <button
          type="submit"
          className="w-full bg-black text-white rounded-lg py-2"
        >
          회원가입
        </button>
      </form>
    </main>
  );
}
