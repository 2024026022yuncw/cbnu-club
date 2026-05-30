"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase-client";

export default function LoginButton() {
  const router = useRouter();

  const [email, setEmail] = useState<string | null>(null);

  useEffect(() => {
    async function loadUser() {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      setEmail(user?.email ?? null);
    }

    loadUser();
  }, []);

  async function handleLogout() {
    await supabase.auth.signOut();
    location.reload();
  }

  if (email) {
    return (
  <div className="flex items-center gap-2">
    <span className="text-sm">
      {email}
    </span>

    <Link
      href="/mypage"
      className="px-3 py-2 rounded-lg bg-blue-600 text-white"
    >
      마이페이지
    </Link>

    <button
      onClick={handleLogout}
      className="px-3 py-2 rounded-lg bg-red-500 text-white"
    >
      로그아웃
    </button>
  </div>
);
  }
  return (
    <button
      className="px-4 py-2 rounded-lg bg-black text-white"
      onClick={() => router.push("/login")}
    >
      로그인
    </button>
  );
}

