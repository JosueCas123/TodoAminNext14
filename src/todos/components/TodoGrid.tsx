'use client'

import { Todo } from "@prisma/client"
import { TodoItem } from "./TodoItem";
import * as todosApi from '@/todos/helpers/todos'
import { useRouter } from "next/navigation";

interface Props {
    todo?:Todo[];
}

export const TodoGrid = ({todo=[]}:Props) => {

    const router = useRouter()

    const toogleTodo = async(id:string, complete:boolean)=>{
        const updatedTodo = await todosApi.updateTodo(id, complete)
        router.refresh()
    }
  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
        {
            todo.map(todo=>(
                <TodoItem key={todo.id} todo={todo} toogleTodo={toogleTodo}/>
            ))
        }
    </div>
  )
}
