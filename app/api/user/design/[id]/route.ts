import { NextRequest, NextResponse } from "next/server";

import prisma from '../../../../../prisma/client'


export async function DELETE(request: NextRequest, { params }: { params: { id: string } }) {

    let deletedCode = await prisma.generatedCode.delete({ where: { id: params.id } })

    return NextResponse.json(deletedCode, { status: 200 })

}