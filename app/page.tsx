import { Button } from "@/components/ui/button";
import { getSession, useSession } from "next-auth/react";
import { AuthOptions } from "./api/auth/[...nextauth]/AuthOptions";
import { getServerSession } from "next-auth";
import UserInfo from "./_components/providers/UserInfo";

export default async function Home() {

  const session = await getServerSession(AuthOptions)

  return (
    <main>
      <h1>Hi {session?.user?.name}</h1>
      <Button variant={'outline'} size={'sm'}>Click Me</Button>
      <UserInfo />
    </main>
  )
}
