import Image from "next/image"
import Link from "next/link"
import {  CiLogout,  } from "react-icons/ci"
import {  IoBasketOutline, IoCalendarOutline, IoCheckboxOutline, IoCodeWorkingOutline, IoListOutline, IoPerson, IoPersonOutline,  } from "react-icons/io5"
import { LogoutButton, SidebarItem } from "./"
import { getServerSession } from "next-auth"
import { authOptions } from "@/app/api/auth/[...nextauth]/route"


const menuItem = [
  {
    icon: <IoCalendarOutline/>,
    title: 'Dashboard',
    path: '/dashboard'
  },
  {
    icon: <IoCheckboxOutline/>,
    title: 'Res TODOS',
    path: '/dashboard/res-todo'
  },
  {
    icon: <IoListOutline/>,
    title: 'Server Action',
    path: '/dashboard/server-todos'
  },
  {
    icon: <IoCodeWorkingOutline/>,
    title: 'Cookies',
    path: '/dashboard/cookies'
  },
  {
    icon: <IoBasketOutline/>,
    title: 'Productos',
    path: '/dashboard/products'
  },
  {
    icon: <IoPersonOutline/>,
    title: 'Perfil',
    path: '/dashboard/profile'
  }
]

export const Sidebar = async() => {

  const session = await getServerSession(authOptions)

  const name = session?.user?.name ?? 'No name'
  const userRol = session?.user?.roles ?? ['No role']

  const avatarUrl = (session?.user?.image)
    ? session.user.image
    : 'https://tailus.io/sources/blocks/stats-cards/preview/images/second_user.webp'


  return (
    <aside className="ml-[-100%] fixed z-10 top-0 pb-3 px-6 w-full flex flex-col justify-between h-screen border-r bg-white transition duration-300 md:w-4/12 lg:ml-0 lg:w-[25%] xl:w-[20%] 2xl:w-[15%]">
    <div>
      <div className="-mx-6 px-6 py-4">
        {/* TODO: Next/Link hacia dashboard */}
        <Link href="#" title="home">
          {/* Next/Image */}
          <Image src="https://tailus.io/sources/blocks/stats-cards/preview/images/logo.svg" className="w-32" alt="tailus logo" width={150} height={150}/>
        </Link>
      </div>

      <div className="mt-8 text-center">
        {/* Next/Image */}
        <Image 
          src={avatarUrl} 
          width={150}
          height={150}
          alt="" 
          className="w-10 h-10 m-auto rounded-full object-cover lg:w-28 lg:h-28"
        />
          <h5 className="hidden mt-4 text-xl font-semibold text-gray-600 lg:block">{name}</h5>
          <span className="hidden text-gray-400 lg:block">{userRol.join(',')}</span>
      </div>

      <ul className="space-y-2 tracking-wide mt-8">
        {
          menuItem.map(item => (
            <SidebarItem key={item.path} icon={item.icon} title={item.title} path={item.path}/>
          ))
        }
        
      </ul>
    </div>

    <div className="px-6 -mx-6 pt-4 flex justify-between items-center border-t">
        <LogoutButton/>
    </div>
  </aside>
  )
}
