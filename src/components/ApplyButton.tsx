"use client";

import { supabase } from "@/lib/supabase-client";

export default function ApplyButton({
  clubId,
}: {
  clubId: string;
}) {
  async function handleApply() {
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      alert("로그인이 필요합니다.");
      return;
    }
const { data: existing } = await supabase
  .from("club_applications")
  .select("id")
  .eq("club_id", clubId)
  .eq("user_id", user.id)
  .maybeSingle();

if (existing) {
  alert("이미 신청한 동아리입니다.");
  return;
}
   const { error } = await supabase
      .from("club_applications")
      .insert({
        club_id: clubId,
        user_id: user.id,
      });

    if (error) {
      alert(error.message);
      return;
    }

    alert("가입 신청 완료!");
  }

  return (
    <button
      onClick={handleApply}
      className="mt-6 px-4 py-2 bg-blue-600 text-white rounded-lg"
    >
      가입 신청
    </button>
  );
}
