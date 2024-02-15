import { Button } from "@/components/ui/button";
import { getSession, useSession } from "next-auth/react";
import { AuthOptions } from "./api/auth/[...nextauth]/AuthOptions";
import { getServerSession } from "next-auth";
import UserInfo from "./_components/providers/UserInfo";
import Hero from "./_components/providers/Hero";

export default async function Home() {

  const session = await getServerSession(AuthOptions)

  return (
    <main>
      <Hero />
    </main>
  )
}
