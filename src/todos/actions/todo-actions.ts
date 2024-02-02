
'use server'

import prisma from "@/lib/prisma"
import { Todo } from "@prisma/client"
import { revalidatePath } from "next/cache"


const sleep = async(seconds: number )=> {
    return new Promise((resolve) => {
        setTimeout(() => { 
            resolve(true)
        },seconds * 1000 )
    })
}


export const toogleTodo = async(id:string, complete:boolean):Promise<Todo> => {

    await sleep(3)

    const todo = await prisma.todo.findFirst({where:{id}})

    if(!todo) {
        throw `Todo con id ${id} no encontrado`
    }

    const updateTodo = await prisma.todo.update({
        where:{id},
        data:{complete}
    }) 
    revalidatePath('dashboard/server-todos')
    return updateTodo;
    
} 




export const addTodo = async(description:string, userId:string) => {

    try {
     
        // insertamos a la base de datos
        const todo = await prisma.todo.create({data:{description, userId}})
        revalidatePath('dashboard/server-todos')
        return todo
       
        
    } catch (error) {
        return {
            message:error
        }
    }

}
    

export const deleteTodo = async()=> {
    try {
        const todo = await prisma.todo.deleteMany({where:{complete:true}})
        revalidatePath('dashboard/server-todos')
        return todo
    } catch (error) {
        return {
            message:error
        }
    }

}

