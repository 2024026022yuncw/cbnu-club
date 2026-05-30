export default function LoginPage() {
  return (
    <main className="max-w-md mx-auto p-8">
      <h1 className="text-3xl font-bold mb-6">
        로그인
      </h1>

      <form className="space-y-4">
        <input
          type="email"
          placeholder="이메일"
          className="border rounded-lg px-4 py-2 w-full"
        />

        <input
          type="password"
          placeholder="비밀번호"
          className="border rounded-lg px-4 py-2 w-full"
        />

        <button
          type="submit"
          className="w-full bg-black text-white rounded-lg py-2"
        >
          로그인
        </button>
      </form>
    </main>
  );
}
