"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase-client";

export default function AdminPage() {
  const [applications, setApplications] = useState<any[]>([]);

  async function updateStatus(
    applicationId: string,
    status: string
  ) {
    const { error } = await supabase
      .from("club_applications")
      .update({ status })
      .eq("id", applicationId);

    if (error) {
      alert(error.message);
      return;
    }

    setApplications((prev) =>
      prev.map((item) =>
        item.id === applicationId
          ? { ...item, status }
          : item
      )
    );
  }

  useEffect(() => {
    async function loadApplications() {
      const { data } = await supabase
        .from("club_applications")
        .select(`
          id,
          status,
          clubs (
            name
          )
        `);

      setApplications(data ?? []);
    }

    loadApplications();
  }, []);

  return (
    <main className="max-w-4xl mx-auto p-8">
      <h1 className="text-4xl font-bold mb-6">
        관리자 페이지
      </h1>

      <h2 className="text-2xl font-semibold mb-4">
        신청자 목록
      </h2>

      <ul className="space-y-2">
        {applications.map((item) => (
          <li
            key={item.id}
            className="border rounded-lg p-3 flex justify-between items-center"
          >
            <div>
              {item.clubs?.name} ({item.status})
            </div>

            <div className="flex gap-2">
              <button
                onClick={() =>
                  updateStatus(
                    item.id,
                    "approved"
                  )
                }
                className="px-3 py-1 rounded bg-green-600 text-white"
              >
                승인
              </button>

              <button
                onClick={() =>
                  updateStatus(
                    item.id,
                    "rejected"
                  )
                }
                className="px-3 py-1 rounded bg-red-600 text-white"
              >
                거절
              </button>
            </div>
          </li>
        ))}
      </ul>
    </main>
  );
}
