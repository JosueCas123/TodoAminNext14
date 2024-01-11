import prisma from '@/lib/prisma'
import { NextResponse, NextRequest } from 'next/server'

export async function GET(request: Request) { 

    await prisma.todo.deleteMany()
  	

    const todos = await prisma.todo.createMany({
        data: [
    {description: 'pidra del alma', complete:true},
    {description: 'pidra del espíritu'},
    {description: 'pidra del poder'},
    {description: 'pidra del tiempo'},
    {description: 'pidra del sueño'},
    ]})

  return NextResponse.json({
    message:'seed execute'
  })
}