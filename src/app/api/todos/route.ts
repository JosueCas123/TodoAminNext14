import { getUserSessionServer } from '@/auth/actions/auth-actions'
import prisma from '@/lib/prisma'
import { get } from 'http'
import { NextResponse, NextRequest } from 'next/server'

import * as yup  from 'yup'

export async function GET(request: Request) { 

    const { searchParams } = new URL(request.url)
    const take = Number(searchParams.get('take') ?? '10')
    const skip = Number(searchParams.get('skip') ?? '0' )

    if(isNaN (take)) {
        return NextResponse.json({message: 'Please provide a take parameter'}, {status:400})
    }
    if(isNaN (skip)) {
        return NextResponse.json({message: 'Please provide a take parameter'}, {status:400})
    }
    const todpos = await prisma.todo.findMany({
        take, skip 
    });

    return NextResponse.json(todpos);

}


const postSchema = yup.object({
    description: yup.string().required(),
    complete: yup.boolean().optional().default(false),

})


export async function POST(request: Request) {
    
    const users= await getUserSessionServer()
    
    

    if(!users || !users.user?.id) {
        return NextResponse.json({message: 'You must be authenticated'}, {status:401})
    }

    try {
        // el body tiene la data
        const {description, complete} =  await postSchema.validate( await request.json());
        // insertamos a la base de datos
        const todo = await prisma.todo.create({data:{description, complete, userId:users.user?.id}})
        return NextResponse.json(todo)
        
    } catch (error) {
        return NextResponse.json({message: error}, {status:400})
    }

}
export async function DELETE(request: Request) { 
    const users= await getUserSessionServer()
    
    

    if(!users || !users.user?.id) {
        return NextResponse.json({message: 'You must be authenticated'}, {status:401})
    }

    try {
        await prisma.todo.deleteMany({where:{complete:true, userId:users.user?.id}})
        return NextResponse.json({message: "Todos deleted"})
        
    } catch (error) {
        return NextResponse.json({message: error}, {status:400})
    }

}