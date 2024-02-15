import { NextRequest, NextResponse } from "next/server"

import prisma from '../../../../../prisma/client'
import { getServerSession } from "next-auth";
import { AuthOptions } from "@/app/api/auth/[...nextauth]/AuthOptions";

type User = {
    role: string
}


export async function PUT(request: NextRequest, { params }: { params: { id: string } }) {


    const session = await getServerSession(AuthOptions);

    const userRole = (session?.user as User).role;

    if (userRole !== "admin") {
        return NextResponse.json("un authorized", { status: 401 })
    }

    const body = await request.json();

    let updatedUser = await prisma.user.update({
        where: { id: params.id },
        data: {
            credit: Number(body.credit)
        }

    })

    return NextResponse.json("Updated Successfully", { status: 200 })

}