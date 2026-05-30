import Link from "next/link";

import { supabase } from "@/lib/supabase";
import ApplyButton from "@/components/ApplyButton";

export default async function ClubDetail({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const { data: club, error } = await supabase
    .from("clubs")
    .select("*")
    .eq("id", id)
    .single();

  if (error || !club) {
    return <div>동아리를 찾을 수 없습니다.</div>;
  }

  return (
    <main className="max-w-3xl mx-auto p-8">
      <h1 className="text-4xl font-bold mb-6">
        {club.name}
      </h1>

      <div className="space-y-4">
        <p>
          <strong>분류:</strong> {club.category}
        </p>

        <p>
          <strong>설명:</strong> {club.description}
        </p>

        <p>
          <strong>회원 수:</strong>{" "}
          {club.official_member_count}명
        </p>

        <p>
          <strong>설립연도:</strong>{" "}
          {club.established_at}
        </p>

        <p>
          <strong>상태:</strong> {club.status}
        </p>
      </div>
      <ApplyButton clubId={club.id} />
    </main>
  );
}

