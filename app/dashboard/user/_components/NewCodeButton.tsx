import { Button } from '@/components/ui/button'
import React from 'react'

const NewCodeButton = () => {
    return (
        <div className='flex justify-end'>
            <Button variant={'outline'}>Generate new code</Button>
        </div>
    )
}

export default NewCodeButton