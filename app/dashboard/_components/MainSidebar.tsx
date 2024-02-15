import React from 'react'
import SidebarRoutes from './SidebarRoutes'
import { getServerSession } from 'next-auth'
import { AuthOptions } from '@/app/api/auth/[...nextauth]/AuthOptions'
import { User } from '@prisma/client'
import UserAvatar from './UserAvatar'
import Link from 'next/link'

const MainSidebar = async () => {

  const session = await getServerSession(AuthOptions);
  const userRole = (session?.user as User).role

  return (
    <div className='relative h-full border-r flex flex-col overflow-y-auto bg-white shadow-sm'>

      <div className='p-6'>
        <Link href="/" className='text-slate-500 text-2xl font-bold'>Saasify</Link>
      </div>

      <div className='flex flex-col w-full'>
        <SidebarRoutes role={userRole} />
      </div>

      {/* user avatar */}

      <div className='absolute bottom-0 p-6'>
        <UserAvatar user={session?.user!} />
      </div>

    </div>
  )
}

export default MainSidebar