"use client";
import { BookAIcon, Group, ViewIcon } from 'lucide-react'
import SidebarItem from './SidebarItem'

const adminRoutes = [
    {
        id: 1,
        icon: ViewIcon,
        label: "Design a code",
        href: "dashboard/user/design",
        isShare: true,
    },
    {
        id: 2,
        icon: ViewIcon,
        label: "List",
        href: "dashboard/user",
        isShare: true,
    },
    {
        id: 3,
        icon: ViewIcon,
        label: "Dashboard",
        href: "dashboard/admin",
        isShare: false,
    },
    {
        id: 4,
        icon: Group,
        label: "Users List",
        href: "dashboard/admin/users",
        isShare: false,
    },
]

const userRoutes = [
    {
        id: 1,
        icon: ViewIcon,
        label: "Design a code",
        href: "dashboard/user/design",
        isShare: true,
    },
    {
        id: 2,
        icon: BookAIcon,
        label: "List",
        href: "dashboard/user",
        isShare: true,
    }
]


const SidebarRoutes = ({ role }: { role: string }) => {

    const routes = role === "admin" ? adminRoutes : userRoutes;

    return (
        <div className='flex flex-col w-full'>
            {routes.map((route) => (
                <SidebarItem
                    id={route.id}
                    href={route.href}
                    icon={route.icon}
                    label={route.label}
                    isShare={route.isShare}
                    key={route.id}
                />
            ))}
        </div>
    )
}

export default SidebarRoutes