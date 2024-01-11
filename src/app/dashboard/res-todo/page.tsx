import prisma from "@/lib/prisma";
import { NewTodo, TodoGrid } from "@/todos";


export const metadata = {
 title: 'Todos',
 description: 'Todos complete',
}
export default async function ResTodosPage() {

  const todos = await prisma.todo.findMany({orderBy:{description:'asc'}})

  return (
    <div>
      <div className="w-full px-3 mx-5 mb-5">
        <NewTodo/>
      </div>
      <TodoGrid todo={todos}/>
    </div>
  );
}