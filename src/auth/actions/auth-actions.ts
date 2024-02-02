import { authOptions } from "@/app/api/auth/[...nextauth]/route"
import prisma from "@/lib/prisma"
import bcrtpt from 'bcrypt'
import { getServerSession } from "next-auth"

export const getUserSessionServer = async () => {
    const users = await getServerSession(authOptions)
    return users
}

export const singInEmail = async (email: string, password: string) => {


    if(!email || !password) return null
    const user = await prisma.user.findUnique({where: {email}})

    if(!user){
        const newUser = await createUsers(email, password)
        return newUser
    }

    if(bcrtpt.compareSync(password, user.password ?? '')){
        return user 
    }

    return user
}

const createUsers = async (email:string, password:string) => {
    const user = await prisma.user.create({
        data: {
          email:email,
          password: bcrtpt.hashSync(password, 10),
          name: email.split('@')[0],
        }
    })
    return user

}