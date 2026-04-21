"use client";

import { useRouter } from "next/navigation";

export default function Dashboard() {
  const router = useRouter();

  return (
    <div>
      <h1>Dashboard</h1>

      <button onClick={() => router.push("/chat")}>Go Chat</button>
    </div>
  );
}
