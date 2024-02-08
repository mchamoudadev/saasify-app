import React from 'react'

import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet"
import { Menu } from 'lucide-react'
import MainSidebar from './MainSidebar'


const MobileMenu = () => {
    return (
        <Sheet>
            <SheetTrigger className='md:hidden pr-4 hover:opacity-75 transition'>
                <Menu />
            </SheetTrigger>
            <SheetContent side={"left"} className='p-0'>
                <MainSidebar />
            </SheetContent>
        </Sheet>
    )
}

export default MobileMenu