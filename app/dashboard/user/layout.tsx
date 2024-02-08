import React from 'react'

const UserLayout = async ({ children }: { children: React.ReactNode }) => {
    return (
        <div className='h-full'>
            {/* constant */}

            <div className='bg-green-800 h-[70px] md:pl-56 fixed inset-y-0 w-full z-50'>
                {/* navbar */}
                <h1>Navbar</h1>
            </div>

            <div className='hidden md:flex h-full w-56 bg-black flex-col fixed inset-y-0 z-50'>

            </div>


            <main>
                {children}
            </main>
        </div>
    )
}

export default UserLayout