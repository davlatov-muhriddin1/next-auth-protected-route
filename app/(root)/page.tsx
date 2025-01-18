"use client";

import { Button } from "@/components/ui/button";
import { signOut, useSession } from "next-auth/react";
import React from "react";

export default function Home() {
  const { data: session } = useSession();

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="shadow-md p-5 w-1/4">
        <h1 className="border-b-2 border-neutral-600 py-2">
          {session?.user?.firstName}
        </h1>
        <h1 className="border-b-2 border-neutral-600 py-2">
          {session?.user?.lastName}
        </h1>
        <h1 className="border-b-2 border-neutral-600 py-2">
          {session?.user?.email}
        </h1>

        <Button
          variant={"destructive"}
          className="w-full mt-4"
          onClick={() => signOut()}
        >
          Log Out
        </Button>
      </div>
    </div>
  );
}
