export const dynamic = 'force-dynamic'
export const revalidate = 0


import { getUserSessionServer } from "@/auth/actions/auth-actions";
import prisma from "@/lib/prisma";
import { NewTodo, TodoGrid } from "@/todos";
import { redirect } from "next/navigation";


export const metadata = {
 title: 'Todos',
 description: 'Todos complete',
}
export default async function ResTodosPage() {

  const user = await getUserSessionServer()
    console.log('user', user)
    if(!user) redirect('/api/auth/singin')

    const todos = await prisma.todo.findMany({
        where:{userId: user.user?.id},
        orderBy: { 
        description: 'asc' } })

  return (
    <div>
      <div className="w-full px-3 mx-5 mb-5">
        <NewTodo/>
      </div>
      <TodoGrid todo={todos}/>
    </div>
  );
}