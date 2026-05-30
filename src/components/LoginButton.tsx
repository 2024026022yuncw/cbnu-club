"use client";

import { useRouter } from "next/navigation";

export default function LoginButton() {
  const router = useRouter();

  return (
    <button
      className="px-4 py-2 rounded-lg bg-black text-white"
      onClick={() => router.push("/login")}
    >
      로그인
    </button>
  );
}
