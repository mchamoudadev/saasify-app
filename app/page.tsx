import { Button } from "@/components/ui/button";
import { getSession, useSession } from "next-auth/react";
import { AuthOptions } from "./api/auth/[...nextauth]/AuthOptions";

export default function Home() {

  return (
    <main>
      <h1>Hi</h1>
      <Button variant={'outline'} size={'sm'}>Click Me</Button>
    </main>
  )
}
