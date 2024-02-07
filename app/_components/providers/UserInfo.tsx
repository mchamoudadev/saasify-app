"use client"
import { useSession } from 'next-auth/react'
import React from 'react'

const UserInfo = () => {


    const session = useSession()

    console.log(session)

    // if (!session.data) return <h1>loading...</h1>

    return (
        <div className='bg-green-300'>Hello {session.data?.user?.name}</div>
    )
}

export default UserInfo