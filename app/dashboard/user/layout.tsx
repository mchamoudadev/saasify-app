import React from 'react'
import MainSidebar from '../_components/MainSidebar'
import Navbar from '../_components/Navbar'
import Layout from '../_components/Layout'

export const UserLayout = async ({ children }: { children: React.ReactNode }) => {
    return (
        <Layout children={children} />
    )
}

export default UserLayout