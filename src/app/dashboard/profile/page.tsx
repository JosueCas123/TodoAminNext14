
'use client'

import { useSession } from "next-auth/react";
import { useEffect } from "react";

export default function NamePage() {

    const {data:session} = useSession()

    useEffect(() => {
        console.log('Hello Page')
    }, [])

  return (
    <div>
      <h1>Hello Page</h1>
      <hr />

      <div className="flex flex-col"> 
        <span>{session?.user?.name ?? 'No name'}</span>
        <span>{session?.user?.email ?? 'No Email'}</span>
        <span>{session?.user?.image ?? 'No Image'}</span>
      </div>
    </div>
  );
}