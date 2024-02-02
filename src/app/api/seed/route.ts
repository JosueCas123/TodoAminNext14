import prisma from '@/lib/prisma'
import { NextResponse, NextRequest } from 'next/server'

import bcrypt from 'bcrypt';

export async function GET(request: Request) { 

    await prisma.todo.deleteMany()
    await prisma.user.deleteMany()

    const user = await prisma.user.create({
        data: {
          email:'test1@google.com',
          password:bcrypt.hashSync('123456', 10),
          roles:['ADMIN', 'USER', 'GUEST'],
          todos: {
            create: [
              {description: 'pidra del alma', complete:true},
              {description: 'pidra del espíritu'},
              {description: 'pidra del poder'},
              {description: 'pidra del tiempo'},
              {description: 'pidra del sueño'},
            ]
          }
        }
          
    })

    // const todos = await prisma.todo.createMany({
    //     data: [
    // {description: 'pidra del alma', complete:true},
    // {description: 'pidra del espíritu'},
    // {description: 'pidra del poder'},
    // {description: 'pidra del tiempo'},
    // {description: 'pidra del sueño'},
    // ]})

  return NextResponse.json({
    message:'seed execute'
  })
}