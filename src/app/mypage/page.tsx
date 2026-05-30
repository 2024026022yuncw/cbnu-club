"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase-client";

type Application = {
  id: string;
  club_id: string;
};

export default function MyPage() {
  const [email, setEmail] = useState("");
  const [applications, setApplications] = useState<Application[]>([]);

  async function handleCancel(applicationId: string) {
    const ok = confirm("신청을 취소하시겠습니까?");

    if (!ok) return;

    const { error } = await supabase
      .from("club_applications")
      .delete()
      .eq("id", applicationId);

    if (error) {
      alert(error.message);
      return;
    }

    setApplications((prev) =>
      prev.filter((item) => item.id !== applicationId)
    );

    alert("신청이 취소되었습니다.");
  }

  useEffect(() => {
    async function loadUser() {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) return;

      setEmail(user.email ?? "");

      const { data, error } = await supabase
        .from("club_applications")
        .select("id, club_id")
        .eq("user_id", user.id);

      if (error) {
        console.error(error);
        return;
      }

      setApplications(data ?? []);
    }

    loadUser();
  }, []);

  return (
    <main className="max-w-3xl mx-auto p-8">
      <h1 className="text-4xl font-bold mb-6">
        마이페이지
      </h1>

      <p className="mb-6">
        로그인 계정: {email}
      </p>

      <h2 className="text-2xl font-semibold mb-4">
        내 신청 목록
      </h2>

      <ul className="space-y-2">
        {applications.map((item) => (
          <li
            key={item.id}
            className="border rounded-lg p-3 flex justify-between items-center"
          >
            <span>{item.club_id}</span>

            <button
              onClick={() => handleCancel(item.id)}
              className="px-3 py-1 rounded bg-red-500 text-white"
            >
              신청 취소
            </button>
          </li>
        ))}
      </ul>
    </main>
  );
}
