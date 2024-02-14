import { DataTable } from '@/components/ui/data-table'
import React from 'react'
import { columns } from './_components/Column'
import prisma from '../../../../../prisma/client'

const UserPage = async () => {

    const data = await prisma.user.findMany();

    return (
        <div>
            <DataTable columns={columns} data={data} filter={"email"} />
        </div>
    )
}

export default UserPage