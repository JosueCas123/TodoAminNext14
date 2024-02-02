import { WidgetItem } from "@/components";
import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";


export default async function DashboardPage() {

  // Estamos haciendo la parte del usuario conectado en NexAuth autenticación de tutas
  
  const session = await getServerSession(authOptions)

  if (!session) {
    redirect('/api/auth/signin')
  }


  return (
    <>

      {/* TODO: dashboard/page.tsx  */}
      {/* Este contenido va dentro de page.tsx */}
      <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 ">
        
        {/* TODO: src/components <WidgetItem /> */}
          <WidgetItem title='Usuario conectado S-Side'>
            <div className="flex flex-col">
                <span>{session.user?.name}</span>
                <span>{session.user?.image}</span>
                <span>{session.user?.email}</span>
                {JSON.stringify(session)}
            </div>
          </WidgetItem>
        {/* TODO: Fin <WidgetItem /> */}

      </div>  
      {/* TODO: fin del dashboard/page.tsx  */}



      {/* TODO: Fin del contenido en el Layout.tsx */}
    </>

  
  );
}