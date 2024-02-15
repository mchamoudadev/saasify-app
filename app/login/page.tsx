"use client"
import React from 'react'

import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { Button } from '@/components/ui/button'
import { FcGoogle } from 'react-icons/fc'
import { signIn, useSession } from 'next-auth/react'


const LoginPage = () => {

    return (
        <div className='flex h-screen justify-center items-center'>

            <Card className='w-[350px]'>
                <CardHeader>
                    <CardTitle>Login User</CardTitle>
                    <CardDescription>Login with your google account.</CardDescription>
                </CardHeader>
                <CardContent>
                    <div className='grid w-full items-center gap-4'>
                        <div className='flex flex-col space-y-1.5'>
                            <Button
                                onClick={() => signIn('google', {
                                    callbackUrl: '/dashboard/user'
                                })}
                                variant={'outline'}
                                className='flex space-x-2'
                            >
                                <FcGoogle className='w-6 h-6' />
                                <span>Continue with google</span> </Button>
                        </div>
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}

export default LoginPage