import Link from "next/link";
import { supabase } from "@/lib/supabase";

export default async function Home() {
  const { data: clubs, error } = await supabase
    .from("clubs")
    .select("*")
    .order("name");

  if (error) {
    return <div>에러 발생: {error.message}</div>;
  }

  const categories = [...new Set(clubs?.map((c) => c.category))];

  return (
    <main className="max-w-5xl mx-auto p-8">
      <h1 className="text-4xl font-bold mb-8">
        충북대학교 중앙동아리
      </h1>

      <div className="flex gap-2 mb-6">
        {categories.map((category) => (
          <span
            key={category}
            className="px-3 py-1 rounded-full border text-sm"
          >
            {category}
          </span>
        ))}
      </div>

      <div className="grid md:grid-cols-2 gap-4">
        {clubs?.map((club) => (
  <Link
    href={`/clubs/${club.id}`}
    key={club.id}
    className="border rounded-xl p-5 shadow-sm block hover:shadow-lg transition"
  >
    <h2 className="text-2xl font-semibold">
      {club.name}
    </h2>

    <p className="text-blue-600 mt-2">
      {club.category}
    </p>

    <p className="mt-3 text-gray-700">
      {club.description}
    </p>

      <div className="mt-4 text-sm text-gray-500">
      회원 수: {club.official_member_count}명
    </div>
  </Link>
))}
      </div>
    </main>
  );
}
