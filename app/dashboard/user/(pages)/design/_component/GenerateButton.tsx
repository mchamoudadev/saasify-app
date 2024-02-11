"use client"
import { Button } from '@/components/ui/button'
import { Loader2Icon } from 'lucide-react'
import React, { useState } from 'react'

const GenerateButton = () => {

    const [loading, setLoading] = useState(false)

    return (
        <div>
            <Button className={`z-[554] absolute top-4 left-[50%] bg-[#3080ed] hover:bg-[#3080ed]/70`}>
                {loading ?
                    <span className='flex space-x-2 justify-center items-center'>
                        Generating...
                        <Loader2Icon className='animate-spin' />
                    </span>
                    : <span>Generate Code</span>
                }
            </Button>
        </div>
    )
}

export default GenerateButton