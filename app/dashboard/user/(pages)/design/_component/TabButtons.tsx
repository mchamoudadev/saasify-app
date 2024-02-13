import { Button } from '@/components/ui/button'
import React from 'react'

interface TabButtonsProps {
    children: React.ReactNode,
    activeTab: boolean,
    onClick: () => void

}


const TabButtons = ({ children, activeTab, onClick }: TabButtonsProps) => {
    return (
        <Button
            onClick={onClick}
            variant={`${activeTab ? "default" : "outline"}`}
        >{children}</Button>
    )
}

export default TabButtons