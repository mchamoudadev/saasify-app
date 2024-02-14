import { Button } from '@/components/ui/button'
import React from 'react'
import { columns } from './_components/Column'
import { DataTable } from '@/components/ui/data-table'

import prisma from '../../../prisma/client'
import NewCodeButton from './_components/NewCodeButton'

const UserPage = async () => {

    const data = await prisma.generatedCode.findMany();

    return (
        <div className='my-4 space-y-4 sm:p-6 lg:p-2'>
            <NewCodeButton />
            <DataTable columns={columns} data={data} filter={'total_tokens'} />
        </div>
    )
}

export default UserPage