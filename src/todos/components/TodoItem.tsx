'use client'

import { Todo } from "@prisma/client"
import styles from './TodoItem.module.css'
import { IoCheckboxOutline, IoSquareOutline } from "react-icons/io5";
import { startTransition, useOptimistic } from "react";

interface Props{
    todo:Todo;
    //todo Acciones que quiero llamar 
    toogleTodo: (id:string, complete:boolean) => Promise<Todo | void>;
}

export const TodoItem = ({todo, toogleTodo}:Props) => {

    const [todoOptmistic, toogleTodoOptimistic] = useOptimistic(
        todo,
        (state, newCompleteValue: boolean) => ({...state, complete:newCompleteValue}) 
        )

        const onToggleTodo = async ( ) => {
             try {
                startTransition( () => toogleTodoOptimistic(!todoOptmistic.complete))
                await toogleTodo(todoOptmistic.id, !todoOptmistic.complete)
             } catch (error) { 
                startTransition( () => toogleTodoOptimistic(!todoOptmistic.complete))
             }
        }

  return (
    <div className={todoOptmistic.complete ? styles.todoDone :  styles.todoPending}>
        <div className="flex flex-col sm:flex-row justify-start items-center gap-4">
            <div
            // onClick={()=> toogleTodo(todoOptmistic.id, !todoOptmistic.complete)}
            onClick={onToggleTodo}
            className={`flex p-2 rounded-md cursor-pointer hover:bg-opacity-60 ${todoOptmistic.complete ? 'bg-blue-100' : 'bg-red-100'}`
            }>
                {
                    todoOptmistic.complete 
                        ? <IoCheckboxOutline/>
                        : <IoSquareOutline/>
                }
                
            </div>

            <div className="text-center sm:text-left">
                {
                    todoOptmistic.description
                }
            </div>

        </div>
    </div>
  )
}
