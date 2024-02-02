
'use client'

import { SessionProvider } from "next-auth/react";

interface AuthProviderPageProps {
    children:React.ReactNode;
}

export default function AuthProviderPage({children, ...res}:AuthProviderPageProps) {
  return (
    <SessionProvider>
        {children}
    </SessionProvider>
  );
}