import { NextRequest, NextResponse } from "next/server"

import prisma from '../../../../../prisma/client'


export async function PUT(request: NextRequest, { params }: { params: { id: string } }) {

    const body = await request.json();

    let updatedUser = await prisma.user.update({
        where: { id: params.id },
        data: {
            credit: Number(body.credit)
        }

    })

    return NextResponse.json("Updated Successfully", { status: 200 })

}